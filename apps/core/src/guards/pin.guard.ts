import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

export const PinGuard = NestAuthGuard('jwt');
