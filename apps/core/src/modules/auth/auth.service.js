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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_not_found_exception_1 = require("../../exceptions/user-not-found.exception");
const context_service_1 = require("../../providers/context.service");
const utils_service_1 = require("../../providers/utils.service");
const config_service_1 = require("../../shared/services/config.service");
const user_service_1 = require("../user/user.service");
const TokenPayloadDto_1 = require("./dto/TokenPayloadDto");
let AuthService = AuthService_1 = class AuthService {
    constructor(jwtService, configService, userService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userService = userService;
    }
    /**
     * Create a token for either a user or a device so they can access the system
     * @param entity
     */
    createToken(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return new TokenPayloadDto_1.TokenPayloadDto({
                expiresIn: this.configService.getNumber('JWT_EXPIRATION_TIME'),
                accessToken: yield this.jwtService.signAsync({ id: entity.id }),
            });
        });
    }
    /**
     * Validate that a users credentials are correct
     *
     * @param userLoginDto
     */
    validateUser(userLoginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                email: userLoginDto.email,
            });
            const isPasswordValid = yield utils_service_1.UtilsService.validateHash(userLoginDto.password, user && user.password);
            if (!user || !isPasswordValid) {
                throw new user_not_found_exception_1.UserNotFoundException();
            }
            return user;
        });
    }
    /**
     * Validate that a user's pin is correct
     *
     * @param pinPayloadDto
     */
    validatePin(pinPayloadDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.findAll();
            for (const user of users) {
                if (yield utils_service_1.UtilsService.validateHash(pinPayloadDto.pin, user.pin)) {
                    return user;
                }
            }
            throw new user_not_found_exception_1.UserNotFoundException();
        });
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
    static setAuthUser(user) {
        context_service_1.ContextService.set(AuthService_1._authUserKey, user);
    }
    /**
     * Get the authorized user from the context
     */
    static getAuthUser() {
        return context_service_1.ContextService.get(AuthService_1._authUserKey);
    }
    /**
     * Set the authorized device on the context
     *
     * @param device
     */
    static setAuthDevice(device) {
        context_service_1.ContextService.set(AuthService_1._authDeviceKey, device);
    }
    /**
     * Get the authorized device from the context
     */
    static getAuthDevice() {
        return context_service_1.ContextService.get(AuthService_1._authDeviceKey);
    }
};
AuthService._authUserKey = 'user_key';
AuthService._authDeviceKey = 'device_key';
AuthService = AuthService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_service_1.ConfigService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map