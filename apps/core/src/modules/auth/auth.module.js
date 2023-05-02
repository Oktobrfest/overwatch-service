"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const device_module_1 = require("../device/device.module");
const device_service_1 = require("../device/device.service");
const user_module_1 = require("../user/user.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./jwt.strategy");
const typeorm_1 = require("@nestjs/typeorm");
const device_repository_1 = require("../device/device.repository");
const clicksend_service_1 = require("../../shared/services/clicksend.service");
const device_meta_repository_1 = require("../device/device.meta.repository");
/**
 * Set the module config
 */
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => user_module_1.UserModule),
            common_1.forwardRef(() => device_module_1.DeviceModule),
            common_1.forwardRef(() => clicksend_service_1.ClicksendService),
            typeorm_1.TypeOrmModule.forFeature([device_repository_1.DeviceRepository]),
            typeorm_1.TypeOrmModule.forFeature([device_meta_repository_1.DeviceMetaRepository]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, device_service_1.DeviceService],
        exports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            auth_service_1.AuthService
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map