import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { DeviceModule } from '../device/device.module';
import { DeviceService } from '../device/device.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceRepository } from '../device/device.repository';
import { ClicksendService } from '../../shared/services/clicksend.service';
import { DeviceMetaRepository } from '../device/device.meta.repository';

/**
 * Set the module config
 */
@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => DeviceModule),
    forwardRef(() => ClicksendService),
    TypeOrmModule.forFeature([DeviceRepository]),
    TypeOrmModule.forFeature([DeviceMetaRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, DeviceService],
  exports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthService
  ],
})
export class AuthModule {}
