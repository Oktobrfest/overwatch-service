'use strict';

import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PinPayloadDto {
  @IsString()
  @ApiModelProperty()
  readonly pin: string;
}
