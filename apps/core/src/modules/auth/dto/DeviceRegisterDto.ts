'use strict';

import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { DeviceMetaEntity } from '../../device/device.meta.entity';
import { DeviceMetaEntityDto } from '../../device/dto/DeviceMetaEntityDto';

export class DeviceRegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly clientId: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly location: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly ip: string;

  @ApiModelProperty()
  readonly deviceMetaEntity: DeviceMetaEntity[];
}
