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
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
let TelemetryController = class TelemetryController {
    constructor(client) {
        this.client = client;
    }
    call(data) {
        console.info(data);
        this.client.emit('device', data || 'no data');
        return 15;
    }
    sum(data) {
        console.info(data);
        this.client.emit('device', data || 'no data');
        return (data || []).reduce((a, b) => a + b);
    }
    handleUserCreated(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.emit('overwatch emit watcher', 'watching');
            console.info(data);
        });
    }
    handleDevice(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.emit('device emit watcher', data);
            console.info(data);
        });
    }
};
__decorate([
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.Get('sum*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Number)
], TelemetryController.prototype, "call", null);
__decorate([
    microservices_1.MessagePattern('*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Number)
], TelemetryController.prototype, "sum", null);
__decorate([
    microservices_1.EventPattern('overwatch'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TelemetryController.prototype, "handleUserCreated", null);
__decorate([
    microservices_1.EventPattern('telemetry/*/state'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TelemetryController.prototype, "handleDevice", null);
TelemetryController = __decorate([
    common_1.Controller('telemetry'),
    swagger_1.ApiUseTags('telemetry'),
    __param(0, common_1.Inject('MQTT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], TelemetryController);
exports.TelemetryController = TelemetryController;
//# sourceMappingURL=telemetry.controller.js.map