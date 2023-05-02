import { createParamDecorator } from '@nestjs/common';

export const AuthDevice = createParamDecorator((_data, request) => request.device);
