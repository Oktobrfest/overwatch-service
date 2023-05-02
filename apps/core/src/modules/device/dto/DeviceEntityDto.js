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
class DeviceEntityDto extends AbstractDto_1.AbstractDto {
    constructor(device) {
        super(device);
        this.clientId = device.clientId;
        this.token = device.token;
        this.description = device.description;
        this.location = device.location;
        this.ip = device.ip;
        this.deviceMetaEntity = device.deviceMetaEntity;
    }
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DeviceEntityDto.prototype, "clientId", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], DeviceEntityDto.prototype, "token", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], DeviceEntityDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], DeviceEntityDto.prototype, "location", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], DeviceEntityDto.prototype, "ip", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Array)
], DeviceEntityDto.prototype, "deviceMetaEntity", void 0);
exports.DeviceEntityDto = DeviceEntityDto;
//# sourceMappingURL=DeviceEntityDto.js.map