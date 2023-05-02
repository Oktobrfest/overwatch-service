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
          url: 'mqtt://stalingrad.pmg-holdings.com',
          hostname: 'stalingrad.pmg-holdings.com',
          port: 1883,
          username: 'boss',
          password: 'greenhouse',
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
