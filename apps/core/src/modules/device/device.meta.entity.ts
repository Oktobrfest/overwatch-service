import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { DeviceMetaEntityDto } from './dto/DeviceMetaEntityDto';
import { DeviceEntity } from './device.entity';

@Entity({ name: 'deviceMeta' })
export class DeviceMetaEntity extends AbstractEntity<DeviceMetaEntityDto> {
  @ManyToOne(type => DeviceEntity, {
    cascade: ['insert']
  })
  @JoinColumn({ // todo: not yet fixed
    name: "device_id",
    referencedColumnName: "id"
  })
  deviceEntity: DeviceEntity;

  @Column('varchar', { name: 'metaName', nullable: true, length: 255 })
  metaName: string;

  @Column('varchar', { name: 'metaType', nullable: false, length: 3 })
  metaType: string;

  @Column('varchar', { name: 'units', unique: false, length: 64 })
  units: string;

  dtoClass = DeviceMetaEntityDto;
}
