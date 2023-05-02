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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const PageMetaDto_1 = require("../../common/dto/PageMetaDto");
const auth_service_1 = require("../auth/auth.service");
const device_repository_1 = require("./device.repository");
const DevicesPageDto_1 = require("./dto/DevicesPageDto");
const clicksend_service_1 = require("../../shared/services/clicksend.service");
const device_meta_repository_1 = require("./device.meta.repository");
let DeviceService = class DeviceService {
    constructor(deviceRepository, deviceMetaRepository, authService, clicksendService) {
        this.deviceRepository = deviceRepository;
        this.deviceMetaRepository = deviceMetaRepository;
        this.authService = authService;
        this.clicksendService = clicksendService;
    }
    /**
     * Find single device
     */
    findOne(findData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.deviceRepository.findOne(findData);
        });
    }
    /**
     * Get a device by their client id
     *
     * @param deviceRegisterDto
     */
    findByClientId(deviceRegisterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = this.deviceRepository.createQueryBuilder('device');
            if (deviceRegisterDto.clientId) {
                queryBuilder.orWhere('device.client_id = :clientId', {
                    clientId: deviceRegisterDto.clientId,
                });
            }
            return queryBuilder.getOne();
        });
    }
    /**
     * Create a new device
     *
     * @param deviceRegisterDto
     */
    createDevice(deviceRegisterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield this.deviceRepository.create(deviceRegisterDto);
            const token = yield this.authService.createToken(device);
            device.token = token.accessToken;
            const deviceMeta = this.deviceMetaRepository.create(deviceRegisterDto.deviceMetaEntity);
            return this.deviceRepository.save(device).then((device) => {
                device.deviceMetaEntity = deviceMeta;
                this.deviceMetaRepository.save(deviceMeta);
                /*console.log(this.clicksendService.sendMessage(
                  'test txt message integration',
                  '+17203430674'
                ));*/
                return device;
            });
        });
    }
    /**
     * Create a new device meta
     *
     * @param deviceMetaDto
     */
    createMeta(deviceMetaDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let meta = this.deviceMetaRepository.create(Object.assign({}, deviceMetaDto));
            return this.deviceMetaRepository.save(deviceMetaDto);
        });
    }
    /**
     * Create a new device
     *
     * @param device
     */
    renewDeviceToken(device) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.authService.createToken(device);
            device.token = token.accessToken;
            return this.deviceRepository.save(device);
        });
    }
    /**
     * Get devices by page
     *
     * @param pageOptionsDto
     */
    getDevices(pageOptionsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = this.deviceRepository.createQueryBuilder('device');
            const [devices, devicesCount] = yield queryBuilder
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.take)
                .getManyAndCount();
            const pageMetaDto = new PageMetaDto_1.PageMetaDto({
                pageOptionsDto,
                itemCount: devicesCount,
            });
            return new DevicesPageDto_1.DevicesPageDto(devices.toDtos(), pageMetaDto);
        });
    }
    /**
     * Find all of the devices
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = this.deviceRepository.createQueryBuilder('device');
            return queryBuilder.getMany();
        });
    }
};
DeviceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [device_repository_1.DeviceRepository,
        device_meta_repository_1.DeviceMetaRepository,
        auth_service_1.AuthService,
        clicksend_service_1.ClicksendService])
], DeviceService);
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map