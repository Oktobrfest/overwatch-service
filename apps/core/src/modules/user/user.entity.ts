import { Column, Entity, JoinTable, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UserDto } from './dto/UserDto';
import { PasswordTransformer } from './password.transformer';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: 'USER' })
  role: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true, transformer: new PasswordTransformer() })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true, transformer: new PasswordTransformer() })
  pin: string;

  dtoClass = UserDto;
}
