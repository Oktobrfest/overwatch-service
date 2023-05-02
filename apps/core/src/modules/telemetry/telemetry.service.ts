import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TelemetryService implements OnModuleInit {
  @Cron(CronExpression.EVERY_5_MINUTES)
  emitDevuceStateRequest() {

  }

  onModuleInit(): any {
  }
}
