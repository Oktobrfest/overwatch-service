import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { DeviceEntityDto } from './dto/DeviceEntityDto';
import { DeviceMetaEntity } from './device.meta.entity';

@Entity({ name: 'devices' })
export class DeviceEntity extends AbstractEntity<DeviceEntityDto> {
  @Column('varchar', { name: 'client_id', unique: true, nullable: false, length: 255 })
  clientId: string;

  @Column('varchar', { name: 'token', nullable: true, length: 255 })
  token: string | null;

  @Column('varchar', { name: 'description', nullable: false, length: 255 })
  description: string;

  @Column('varchar', { name: 'location', unique: false, length: 64 })
  location: string;

  @Column('varchar', { name: 'ip', length: 128, nullable: false })
  ip: string;

  @OneToMany(type => DeviceMetaEntity, deviceMetaEntity =>  deviceMetaEntity.deviceEntity, {
    cascade: ['insert']
  })
  deviceMetaEntity: DeviceMetaEntity[];

  dtoClass = DeviceEntityDto;
}
