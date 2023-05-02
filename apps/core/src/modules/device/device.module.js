"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const auth_service_1 = require("../auth/auth.service");
const user_module_1 = require("../user/user.module");
const user_repository_1 = require("../user/user.repository");
const user_service_1 = require("../user/user.service");
const device_controller_1 = require("./device.controller");
const device_repository_1 = require("./device.repository");
const device_service_1 = require("./device.service");
const clicksend_service_1 = require("../../shared/services/clicksend.service");
const device_meta_repository_1 = require("./device.meta.repository");
let DeviceModule = class DeviceModule {
};
DeviceModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => user_module_1.UserModule),
            common_1.forwardRef(() => auth_module_1.AuthModule),
            typeorm_1.TypeOrmModule.forFeature([device_repository_1.DeviceRepository]),
            typeorm_1.TypeOrmModule.forFeature([device_meta_repository_1.DeviceMetaRepository]),
            typeorm_1.TypeOrmModule.forFeature([user_repository_1.UserRepository]),
        ],
        controllers: [device_controller_1.DeviceController],
        providers: [device_service_1.DeviceService, auth_service_1.AuthService, user_service_1.UserService, clicksend_service_1.ClicksendService],
        exports: [device_service_1.DeviceService],
    })
], DeviceModule);
exports.DeviceModule = DeviceModule;
//# sourceMappingURL=device.module.js.map