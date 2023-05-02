import { ApiModelProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { DeviceEntityDto } from './DeviceEntityDto';

export class DevicesPageDto {

  /**
   * Device data transfer object
   */
  @ApiModelProperty({
    type: DeviceEntityDto,
    isArray: true,
  })
  readonly data: DeviceEntityDto[];

  /**
   * The page meta data
   */
  @ApiModelProperty()
  readonly meta: PageMetaDto;

  constructor(data: DeviceEntityDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
