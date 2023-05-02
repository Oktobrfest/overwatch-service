import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { DeviceService } from '../device/device.service';
import { DeviceEntityDto } from '../device/dto/DeviceEntityDto';
import { UserDto } from '../user/dto/UserDto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { DeviceRegisterDto } from './dto/DeviceRegisterDto';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { PinAccessPayloadDto } from './dto/PinAccessPayloadDto';
import { PinPayloadDto } from './dto/PinPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { UserRegisterDto } from './dto/UserRegisterDto';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(
    public readonly userService: UserService,
    public readonly deviceService: DeviceService,
    public readonly authService: AuthService,
  ) {}

  /**
   * User login
   *
   * @param userLoginDto
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createToken(userEntity);
    return new LoginPayloadDto(userEntity.toDto(), token);
  }

  /**
   * User accessing security door
   *
   * @param pinPayloadDto
   */
  @Post('pinAccess')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: PinAccessPayloadDto,
    description: 'Device Info with user pin',
  })
  async userPinAccess(
    @Body() pinPayloadDto: PinPayloadDto,
  ): Promise<UserDto> {
    const userEntity = await this.authService.validatePin(pinPayloadDto);

    return userEntity.toDto();
  }

  /**
   * Register a new user
   *
   * @param userRegisterDto
   */
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(userRegisterDto);

    return createdUser.toDto();
  }

  /**
   * Register a new device
   *
   * @param deviceRegisterDto
   */
  @Post('device')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DeviceRegisterDto,
    description: 'Successfully Registered',
  })
  async deviceRegister(
    @Body() deviceRegisterDto: DeviceRegisterDto,
  ): Promise<DeviceEntityDto> {
    const device = await this.deviceService.createDevice(deviceRegisterDto);

    return device.toDto();
  }

  /**
   * Get the currently logged in user
   *
   * @param user
   */
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(AuthUserInterceptor)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  async getCurrentUser(@AuthUser() user: UserEntity) {
    return user.toDto();
  }
}
