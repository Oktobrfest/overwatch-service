'use strict';

import { ApiModelProperty } from '@nestjs/swagger';

import { DeviceEntityDto } from '../../device/dto/DeviceEntityDto';
import { UserDto } from '../../user/dto/UserDto';
import { PinPayloadDto } from './PinPayloadDto';

export class PinAccessPayloadDto {
  @ApiModelProperty({ type: DeviceEntityDto })
  DeviceEntityDto: DeviceEntityDto;

  @ApiModelProperty({ type: UserDto })
  userDto: UserDto;

  constructor(device: DeviceEntityDto, user: UserDto) {
    this.DeviceEntityDto = device;
    this.userDto = user;
  }
}
