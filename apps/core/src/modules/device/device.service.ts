import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { AuthService } from '../auth/auth.service';
import { DeviceRegisterDto } from '../auth/dto/DeviceRegisterDto';
import { DeviceEntity } from './device.entity';
import { DeviceRepository } from './device.repository';
import { DevicesPageDto } from './dto/DevicesPageDto';
import { DevicesPageOptionsDto } from './dto/DevicesPageOptionsDto';
import { ClicksendService } from '../../shared/services/clicksend.service';
import { DeviceMetaEntityDto } from './dto/DeviceMetaEntityDto';
import { DeviceMetaRepository } from './device.meta.repository';
import { DeviceMetaEntity } from './device.meta.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class DeviceService {
  constructor(
    public readonly deviceRepository: DeviceRepository,
    public readonly deviceMetaRepository: DeviceMetaRepository,
    public readonly authService: AuthService,
    public readonly clicksendService: ClicksendService
  ) {}

  /**
   * Find single device
   */
  async findOne(findData: FindConditions<DeviceEntity>): Promise<DeviceEntity> {
    return this.deviceRepository.findOne(findData);
  }

  /**
   * Get a device by their client id
   *
   * @param deviceRegisterDto
   */
  async findByClientId(
    deviceRegisterDto: DeviceRegisterDto
  ): Promise<DeviceEntity | undefined> {
    const queryBuilder = this.deviceRepository.createQueryBuilder('device');

    if (deviceRegisterDto.clientId) {
      queryBuilder.orWhere('device.client_id = :clientId', {
        clientId: deviceRegisterDto.clientId,
      });
    }

    return queryBuilder.getOne();
  }

  /**
   * Create a new device
   *
   * @param deviceRegisterDto
   */
  async createDevice(
    deviceRegisterDto: DeviceRegisterDto,
  ): Promise<DeviceEntity> {
    const device = await this.deviceRepository.create(deviceRegisterDto);
    const token = await this.authService.createToken(device);
    device.token = token.accessToken;

    const deviceMeta = this.deviceMetaRepository.create(deviceRegisterDto.deviceMetaEntity);

    return this.deviceRepository.save(device).then((device: DeviceEntity) => {
      device.deviceMetaEntity = deviceMeta;
      this.deviceMetaRepository.save(deviceMeta);

      /*console.log(this.clicksendService.sendMessage(
        'test txt message integration',
        '+17203430674'
      ));*/

      return device;
    });
  }

  /**
   * Create a new device meta
   *
   * @param deviceMetaDto
   */
  async createMeta(
    deviceMetaDto: DeviceMetaEntityDto,
  ): Promise<DeviceMetaEntityDto> {
    let meta = this.deviceMetaRepository.create({ ...deviceMetaDto });

    return this.deviceMetaRepository.save(deviceMetaDto);
  }

  /**
   * Create a new device
   *
   * @param device
   */
  async renewDeviceToken(device: DeviceEntity): Promise<DeviceEntity> {
    const token = await this.authService.createToken(device);
    device.token = token.accessToken;

    return this.deviceRepository.save(device);
  }

  /**
   * Get devices by page
   *
   * @param pageOptionsDto
   */
  async getDevices(
    pageOptionsDto: DevicesPageOptionsDto,
  ): Promise<DevicesPageDto> {
    const queryBuilder = this.deviceRepository.createQueryBuilder('device');
    const [devices, devicesCount] = await queryBuilder
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: devicesCount,
    });

    return new DevicesPageDto(devices.toDtos(), pageMetaDto);
  }

  /**
   * Find all of the devices
   */
  async findAll(): Promise<DeviceEntity[] | undefined> {
    const queryBuilder = this.deviceRepository.createQueryBuilder('device');

    return queryBuilder.getMany();
  }
}
