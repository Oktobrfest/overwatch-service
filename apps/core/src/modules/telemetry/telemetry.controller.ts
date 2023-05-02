import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('telemetry')
@ApiUseTags('telemetry')
export class TelemetryController {
  constructor(@Inject('MQTT_SERVICE') private readonly client: ClientProxy) {}

  @HttpCode(HttpStatus.OK)
  @Get('sum*')
  call(data: any): number {
    console.info(data);
    this.client.emit('device', data || 'no data');
    return 15;
  }

  @MessagePattern('*')
  sum(data: any): number {
    console.info(data);
    this.client.emit('device', data || 'no data');
    return (data || []).reduce((a, b) => a + b);
  }

  @EventPattern('overwatch')
  async handleUserCreated(data: string) {
    this.client.emit('overwatch emit watcher', 'watching');
    console.info(data);
  }

  @EventPattern('telemetry/*/state')
  async handleDevice(data: string) {
    this.client.emit('device emit watcher', data);
    console.info(data);
  }
}
