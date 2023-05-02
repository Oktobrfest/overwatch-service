'use strict';

import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { DeviceEntity } from '../device.entity';
import { DeviceMetaEntity } from '../device.meta.entity';
import { DeviceMetaEntityDto } from './DeviceMetaEntityDto';

export class DeviceEntityDto extends AbstractDto {
  @ApiModelProperty()
  clientId: string;

  @ApiModelPropertyOptional()
  token: string;

  @ApiModelPropertyOptional()
  description: string;

  @ApiModelPropertyOptional()
  location: string;

  @ApiModelPropertyOptional()
  ip: string;

  @ApiModelPropertyOptional()
  deviceMetaEntity: DeviceMetaEntity[];

  constructor(device: DeviceEntity) {
    super(device);
    this.clientId = device.clientId;
    this.token = device.token;
    this.description = device.description;
    this.location = device.location;
    this.ip = device.ip;
    this.deviceMetaEntity = device.deviceMetaEntity;
  }
}
