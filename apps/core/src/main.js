"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const transport_enum_1 = require("@nestjs/common/enums/transport.enum");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const path_1 = require("path");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
const app_module_1 = require("./app.module");
const bad_request_filter_1 = require("./filters/bad-request.filter");
const query_failed_filter_1 = require("./filters/query-failed.filter");
const config_service_1 = require("./shared/services/config.service");
const shared_module_1 = require("./shared/shared.module");
const viveo_swagger_1 = require("./viveo-swagger");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        // initialize some stuff
        typeorm_transactional_cls_hooked_1.initializeTransactionalContext();
        typeorm_transactional_cls_hooked_1.patchTypeORMRepositoryWithBaseRepository();
        // setup the app
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(), { cors: true });
        app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
        app.use(helmet());
        app.use(compression());
        app.use(morgan('combined'));
        const reflector = app.get(core_1.Reflector);
        // set up global components
        app.useGlobalFilters(new bad_request_filter_1.HttpExceptionFilter(reflector), new query_failed_filter_1.QueryFailedFilter(reflector));
        app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(reflector));
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
            dismissDefaultMessages: true,
            validationError: {
                target: false,
            },
        }));
        // get all of our configs
        const configService = app.select(shared_module_1.SharedModule).get(config_service_1.ConfigService);
        // setup and connect to the telemetry network
        app.connectMicroservice({
            transport: transport_enum_1.Transport.MQTT,
            options: {
                port: configService.getNumber('TRANSPORT_PORT'),
                url: configService.get('TRANSPORT_PROTOCOL') +
                    '://' +
                    configService.get('TRANSPORT_HOSTNAME'),
                hostname: configService.get('TRANSPORT_HOSTNAME'),
                username: configService.get('TRANSPORT_USERNAME'),
                password: configService.get('TRANSPORT_PASSWORD'),
                protocol: 'mqtt',
            },
        });
        yield app.startAllMicroservicesAsync();
        // set up swagger if we are in a development environments
        if (['development', 'staging'].includes(configService.nodeEnv)) {
            viveo_swagger_1.setupSwagger(app);
        }
        // finalize the app and start listening
        const port = configService.getNumber('HTTP_PORT');
        app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
        app.setBaseViewsDir(path_1.join(__dirname, '..', 'views'));
        app.setViewEngine('hbs');
        yield app.listen(port);
        console.info(`server running on port ${port}`);
        return app;
    });
}
bootstrap()
    .then((app) => console.log(app.getMicroservices()))
    .catch(e => console.log(e));
//# sourceMappingURL=main.js.map