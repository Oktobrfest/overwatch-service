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
const DeviceEntityDto_1 = require("../../device/dto/DeviceEntityDto");
const UserDto_1 = require("../../user/dto/UserDto");
class PinAccessPayloadDto {
    constructor(device, user) {
        this.DeviceEntityDto = device;
        this.userDto = user;
    }
}
__decorate([
    swagger_1.ApiModelProperty({ type: DeviceEntityDto_1.DeviceEntityDto }),
    __metadata("design:type", DeviceEntityDto_1.DeviceEntityDto)
], PinAccessPayloadDto.prototype, "DeviceEntityDto", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: UserDto_1.UserDto }),
    __metadata("design:type", UserDto_1.UserDto)
], PinAccessPayloadDto.prototype, "userDto", void 0);
exports.PinAccessPayloadDto = PinAccessPayloadDto;
//# sourceMappingURL=PinAccessPayloadDto.js.map