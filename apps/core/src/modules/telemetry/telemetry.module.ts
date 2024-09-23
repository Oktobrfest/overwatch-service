import { Inject, Module } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';

import { TelemetryController } from './telemetry.controller';
import { TelemetryService } from './telemetry.service';

@Module({
  controllers: [TelemetryController],
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://changeMe.com',
          hostname: 'changeMe.com',
          port: 1883,
          username: 'changeMe',
          password: 'changeMe',
          protocol: 'mqtt',
        },
      },
    ]),
  ],
  providers: [TelemetryService]
})
export class TelemetryModule {
  constructor(@Inject('MQTT_SERVICE') private readonly client: ClientProxy) {}
}
