import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiUseTags } from '@nestjs/swagger';

import { DeviceService } from './device.service';
import { DeviceMetaEntityDto } from './dto/DeviceMetaEntityDto';

@Controller('device')
@ApiUseTags('device')
export class DeviceController {
  constructor(
    public deviceService: DeviceService
  ) {}

  /**
   * Register a new device
   *
   * @param DeviceMetaEntityDtos
   */
  @Post('registerMeta')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DeviceMetaEntityDto,
    description: 'Successfully Registered',
  })
  async registerMeta(
    @Body() DeviceMetaEntityDtos: DeviceMetaEntityDto[],
  ): Promise<DeviceMetaEntityDto[]> {
    let meta: DeviceMetaEntityDto[];

    for(const DeviceMetaEntityDto of DeviceMetaEntityDtos) {
      meta.push(await this.deviceService.createMeta(DeviceMetaEntityDto));
    }

    return meta;
  }
}
