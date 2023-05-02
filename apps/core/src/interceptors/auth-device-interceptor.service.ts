1// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
//
// import { AuthService } from '../modules/auth/auth.service';
// import { DeviceEntity } from '../modules/device/device.entity';
//
// @Injectable()
// export class AuthDeviceInterceptorService implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const request = context.switchToHttp().getRequest();
//
//     const device = <DeviceEntity>request.device;
//     AuthService.setAuthDevice(device);
//
//     return next.handle();
//   }
// }
