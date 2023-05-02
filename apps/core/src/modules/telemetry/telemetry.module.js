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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const telemetry_controller_1 = require("./telemetry.controller");
const telemetry_service_1 = require("./telemetry.service");
let TelemetryModule = class TelemetryModule {
    constructor(client) {
        this.client = client;
    }
};
TelemetryModule = __decorate([
    common_1.Module({
        controllers: [telemetry_controller_1.TelemetryController],
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'MQTT_SERVICE',
                    transport: microservices_1.Transport.MQTT,
                    options: {
                        url: 'mqtt://stalingrad.pmg-holdings.com',
                        hostname: 'stalingrad.pmg-holdings.com',
                        port: 1883,
                        username: 'boss',
                        password: 'greenhouse',
                        protocol: 'mqtt',
                    },
                },
            ]),
        ],
        providers: [telemetry_service_1.TelemetryService]
    }),
    __param(0, common_1.Inject('MQTT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], TelemetryModule);
exports.TelemetryModule = TelemetryModule;
//# sourceMappingURL=telemetry.module.js.map