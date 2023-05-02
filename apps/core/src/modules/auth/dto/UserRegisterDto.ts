'use strict';

import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Column } from 'typeorm';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @ApiModelProperty({ minLength: 6 })
  readonly password: string;

  @Column()
  // @IsPhoneNumber("ZZ")
  @IsOptional()
  @ApiModelProperty()
  phone: string;

  @IsString()
  @MinLength(4)
  @ApiModelProperty({ minLength: 4 })
  readonly pin: string;

  @IsString()
  @ApiModelProperty()
  readonly role: string;
}
