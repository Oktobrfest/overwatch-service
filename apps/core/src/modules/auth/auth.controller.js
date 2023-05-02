"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_user_decorator_1 = require("../../decorators/auth-user.decorator");
const auth_guard_1 = require("../../guards/auth.guard");
const auth_user_interceptor_service_1 = require("../../interceptors/auth-user-interceptor.service");
const device_service_1 = require("../device/device.service");
const UserDto_1 = require("../user/dto/UserDto");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const DeviceRegisterDto_1 = require("./dto/DeviceRegisterDto");
const LoginPayloadDto_1 = require("./dto/LoginPayloadDto");
const PinAccessPayloadDto_1 = require("./dto/PinAccessPayloadDto");
const PinPayloadDto_1 = require("./dto/PinPayloadDto");
const UserLoginDto_1 = require("./dto/UserLoginDto");
const UserRegisterDto_1 = require("./dto/UserRegisterDto");
let AuthController = class AuthController {
    constructor(userService, deviceService, authService) {
        this.userService = userService;
        this.deviceService = deviceService;
        this.authService = authService;
    }
    /**
     * User login
     *
     * @param userLoginDto
     */
    userLogin(userLoginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEntity = yield this.authService.validateUser(userLoginDto);
            const token = yield this.authService.createToken(userEntity);
            return new LoginPayloadDto_1.LoginPayloadDto(userEntity.toDto(), token);
        });
    }
    /**
     * User accessing security door
     *
     * @param pinPayloadDto
     */
    userPinAccess(pinPayloadDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEntity = yield this.authService.validatePin(pinPayloadDto);
            return userEntity.toDto();
        });
    }
    /**
     * Register a new user
     *
     * @param userRegisterDto
     */
    userRegister(userRegisterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield this.userService.createUser(userRegisterDto);
            return createdUser.toDto();
        });
    }
    /**
     * Register a new device
     *
     * @param deviceRegisterDto
     */
    deviceRegister(deviceRegisterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield this.deviceService.createDevice(deviceRegisterDto);
            return device.toDto();
        });
    }
    /**
     * Get the currently logged in user
     *
     * @param user
     */
    getCurrentUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user.toDto();
        });
    }
};
__decorate([
    common_1.Post('login'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    swagger_1.ApiOkResponse({
        type: LoginPayloadDto_1.LoginPayloadDto,
        description: 'User info with access token',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginDto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogin", null);
__decorate([
    common_1.Post('pinAccess'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    swagger_1.ApiOkResponse({
        type: PinAccessPayloadDto_1.PinAccessPayloadDto,
        description: 'Device Info with user pin',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PinPayloadDto_1.PinPayloadDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userPinAccess", null);
__decorate([
    common_1.Post('register'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    swagger_1.ApiOkResponse({ type: UserDto_1.UserDto, description: 'Successfully Registered' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRegisterDto_1.UserRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRegister", null);
__decorate([
    common_1.Post('device'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    swagger_1.ApiOkResponse({
        type: DeviceRegisterDto_1.DeviceRegisterDto,
        description: 'Successfully Registered',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeviceRegisterDto_1.DeviceRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deviceRegister", null);
__decorate([
    common_1.Get('me'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.UseInterceptors(auth_user_interceptor_service_1.AuthUserInterceptor),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({ type: UserDto_1.UserDto, description: 'current user info' }),
    __param(0, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    swagger_1.ApiUseTags('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        device_service_1.DeviceService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map