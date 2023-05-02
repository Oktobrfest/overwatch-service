import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { DeviceController } from './device.controller';
import { DeviceRepository } from './device.repository';
import { DeviceService } from './device.service';
import { ClicksendService } from '../../shared/services/clicksend.service';
import { DeviceMetaRepository } from './device.meta.repository';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([DeviceRepository]),
    TypeOrmModule.forFeature([DeviceMetaRepository]),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [DeviceController],
  providers: [DeviceService, AuthService, UserService, ClicksendService],
  exports: [DeviceService],
})
export class DeviceModule {}
