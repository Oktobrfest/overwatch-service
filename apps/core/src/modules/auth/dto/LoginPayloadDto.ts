'use strict';

import { ApiModelProperty } from '@nestjs/swagger';

import { UserDto } from '../../user/dto/UserDto';
import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {

  /**
   * User Data transfer object
   */
  @ApiModelProperty({ type: UserDto })
  user: UserDto;

  /**
   * Token data transfer object
   */
  @ApiModelProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(user: UserDto, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}5
