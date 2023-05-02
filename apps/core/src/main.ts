import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { NestApplication, NestFactory, Reflector } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { join } from 'path';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/bad-request.filter';
import { QueryFailedFilter } from './filters/query-failed.filter';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { setupSwagger } from './viveo-swagger';

declare const module: any;

async function bootstrap(): Promise<NestExpressApplication> {
  // initialize some stuff
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  // setup the app
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.use(helmet());
  app.use(compression());
  app.use(morgan('combined'));

  const reflector = app.get(Reflector);

  // set up global components
  app.useGlobalFilters(
    new HttpExceptionFilter(reflector),
    new QueryFailedFilter(reflector),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: true,
      validationError: {
        target: false,
      },
    }),
  );

  // get all of our configs
  const configService = app.select(SharedModule).get(ConfigService);

  // setup and connect to the telemetry network
  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      port: configService.getNumber('TRANSPORT_PORT'),
      url:
        configService.get('TRANSPORT_PROTOCOL') +
        '://' +
        configService.get('TRANSPORT_HOSTNAME'),
      hostname: configService.get('TRANSPORT_HOSTNAME'),
      username: configService.get('TRANSPORT_USERNAME'),
      password: configService.get('TRANSPORT_PASSWORD'),
      protocol: 'mqtt',
    },
  });
  await app.startAllMicroservicesAsync();

  // set up swagger if we are in a development environments
  if (['development', 'staging'].includes(configService.nodeEnv)) {
    setupSwagger(app);
  }

  // finalize the app and start listening
  const port = configService.getNumber('HTTP_PORT');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(port);

  console.info(`server running on port ${port}`);

  return app;

}
bootstrap()
  .then((app: NestExpressApplication) => console.log(app.getMicroservices()))
  .catch(e => console.log(e));
