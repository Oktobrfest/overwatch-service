'use strict';

import { ApiModelPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { UserEntity } from '../user.entity';

export class UserDto extends AbstractDto {
  @ApiModelPropertyOptional()
  firstName: string;

  @ApiModelPropertyOptional()
  lastName: string;

  @ApiModelPropertyOptional()
  username: string;

  @ApiModelPropertyOptional()
  role: string;

  @ApiModelPropertyOptional()
  email: string;

  @ApiModelPropertyOptional()
  pin: string;

  @ApiModelPropertyOptional()
  phone: string;

  constructor(user: UserEntity) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.email = user.email;
    this.phone = user.phone;
    this.pin = user.pin;
  }
}
