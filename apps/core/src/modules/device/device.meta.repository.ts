import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { DeviceMetaEntity } from './device.meta.entity';

@EntityRepository(DeviceMetaEntity)
export class DeviceMetaRepository extends Repository<DeviceMetaEntity> {}
