import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { ContextService } from '../../providers/context.service';
import { UtilsService } from '../../providers/utils.service';
import { ConfigService } from '../../shared/services/config.service';
import { DeviceEntity } from '../device/device.entity';
import { DeviceEntityDto } from '../device/dto/DeviceEntityDto';
import { UserDto } from '../user/dto/UserDto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { PinPayloadDto } from './dto/PinPayloadDto';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';

@Injectable()
export class AuthService {
  private static _authUserKey = 'user_key';
  private static _authDeviceKey = 'device_key';

  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ConfigService,
    public readonly userService: UserService,
  ) {}

  /**
   * Create a token for either a user or a device so they can access the system
   * @param entity
   */
  async createToken(
    entity: UserEntity | UserDto | DeviceEntity | DeviceEntityDto,
  ): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.getNumber('JWT_EXPIRATION_TIME'),
      accessToken: await this.jwtService.signAsync({ id: entity.id }),
    });
  }

  /**
   * Validate that a users credentials are correct
   *
   * @param userLoginDto
   */
  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });
    const isPasswordValid = await UtilsService.validateHash(
      userLoginDto.password,
      user && user.password,
    );
    if (!user || !isPasswordValid) {
      throw new UserNotFoundException();
    }
    return user;
  }

  /**
   * Validate that a user's pin is correct
   *
   * @param pinPayloadDto
   */
  async validatePin(pinPayloadDto: PinPayloadDto): Promise<UserEntity> {
    const users = await this.userService.findAll();
    for (const user of users) {
      if (await UtilsService.validateHash(pinPayloadDto.pin, user.pin)) {
        return user;
      }
    }

    throw new UserNotFoundException();
  }

  /*async createUserAccessLog(
    pinAccessPayloadDto: PinAccessPayloadDto,
  ): Promise<UserAccessLogEntity> {
    const ual = new UserAccessLogEntity();
    ual.userId = AuthService.getAuthUser().id;
    ual.deviceId = pinAccessPayloadDto.device.id;

    return this.userAccessLogRepository.save(ual);
  }*/

  /**
   * Set the authorized user on the context
   *
   * @param user
   */
  static setAuthUser(user: UserEntity) {
    ContextService.set(AuthService._authUserKey, user);
  }

  /**
   * Get the authorized user from the context
   */
  static getAuthUser(): UserEntity {
    return ContextService.get(AuthService._authUserKey);
  }

  /**
   * Set the authorized device on the context
   *
   * @param device
   */
  static setAuthDevice(device: DeviceEntity) {
    ContextService.set(AuthService._authDeviceKey, device);
  }

  /**
   * Get the authorized device from the context
   */
  static getAuthDevice(): DeviceEntity {
    return ContextService.get(AuthService._authDeviceKey);
  }
}
