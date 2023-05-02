'use strict';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query, UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiUseTags('users')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('admin')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  async admin(@AuthUser() user: UserEntity) {
    return 'only for you admin: ' + user.firstName;
  }

  @Get('users')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: UsersPageDto,
  })
  getUsers(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<UsersPageDto> {
    return this.userService.getUsers(pageOptionsDto);
  }
}
