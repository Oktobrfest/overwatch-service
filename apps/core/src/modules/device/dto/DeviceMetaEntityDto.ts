'use strict';

import { ApiModelPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { DeviceMetaEntity } from '../device.meta.entity';
import { DeviceEntity } from '../device.entity';

export class DeviceMetaEntityDto extends AbstractDto {
  @ApiModelPropertyOptional()
  deviceEntity: DeviceEntity;

  @ApiModelPropertyOptional()
  metaName: string;

  @ApiModelPropertyOptional()
  metaType: string;

  @ApiModelPropertyOptional()
  units: string;

  constructor(deviceMeta: DeviceMetaEntity) {
    super(deviceMeta);
    this.deviceEntity = deviceMeta.deviceEntity;
    this.metaName = deviceMeta.metaName;
    this.metaType = deviceMeta.metaType;
    this.units = deviceMeta.units;
  }
}
