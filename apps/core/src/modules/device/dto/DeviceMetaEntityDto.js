'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const AbstractDto_1 = require("../../../common/dto/AbstractDto");
const device_entity_1 = require("../device.entity");
class DeviceMetaEntityDto extends AbstractDto_1.AbstractDto {
    constructor(deviceMeta) {
        super(deviceMeta);
        this.deviceEntity = deviceMeta.deviceEntity;
        this.metaName = deviceMeta.metaName;
        this.metaType = deviceMeta.metaType;
        this.units = deviceMeta.units;
    }
}
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", device_entity_1.DeviceEntity)
], DeviceMetaEntityDto.prototype, "deviceEntity", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], DeviceMetaEntityDto.prototype, "metaName", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], DeviceMetaEntityDto.prototype, "metaType", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], DeviceMetaEntityDto.prototype, "units", void 0);
exports.DeviceMetaEntityDto = DeviceMetaEntityDto;
//# sourceMappingURL=DeviceMetaEntityDto.js.map