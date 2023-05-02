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
const device_service_1 = require("./device.service");
const DeviceMetaEntityDto_1 = require("./dto/DeviceMetaEntityDto");
let DeviceController = class DeviceController {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    /**
     * Register a new device
     *
     * @param DeviceMetaEntityDtos
     */
    registerMeta(DeviceMetaEntityDtos) {
        return __awaiter(this, void 0, void 0, function* () {
            let meta;
            for (const DeviceMetaEntityDto of DeviceMetaEntityDtos) {
                meta.push(yield this.deviceService.createMeta(DeviceMetaEntityDto));
            }
            return meta;
        });
    }
};
__decorate([
    common_1.Post('registerMeta'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    swagger_1.ApiOkResponse({
        type: DeviceMetaEntityDto_1.DeviceMetaEntityDto,
        description: 'Successfully Registered',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "registerMeta", null);
DeviceController = __decorate([
    common_1.Controller('device'),
    swagger_1.ApiUseTags('device'),
    __metadata("design:paramtypes", [device_service_1.DeviceService])
], DeviceController);
exports.DeviceController = DeviceController;
//# sourceMappingURL=device.controller.js.map