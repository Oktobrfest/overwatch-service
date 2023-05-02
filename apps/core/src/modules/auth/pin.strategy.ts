import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '../../shared/services/config.service';
import { DeviceService } from '../device/device.service';

@Injectable()
export class PinStrategy extends PassportStrategy(Strategy) {
  constructor(
    public readonly configService: ConfigService,
    public readonly deviceService: DeviceService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  /**
   * Validate the token for this device
   *
   * @param iat
   * @param exp
   * @param deviceId
   */
  async validate({ iat, exp, id: deviceId }) {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }
    const device = await this.deviceService.findOne(deviceId);

    if (!device) {
      throw new UnauthorizedException();
    }
    return device;
  }
}
