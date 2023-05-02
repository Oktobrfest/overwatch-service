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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../common/abstract.entity");
const DeviceEntityDto_1 = require("./dto/DeviceEntityDto");
const device_meta_entity_1 = require("./device.meta.entity");
let DeviceEntity = class DeviceEntity extends abstract_entity_1.AbstractEntity {
    constructor() {
        super(...arguments);
        this.dtoClass = DeviceEntityDto_1.DeviceEntityDto;
    }
};
__decorate([
    typeorm_1.Column('varchar', { name: 'client_id', unique: true, nullable: false, length: 255 }),
    __metadata("design:type", String)
], DeviceEntity.prototype, "clientId", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'token', nullable: true, length: 255 }),
    __metadata("design:type", String)
], DeviceEntity.prototype, "token", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'description', nullable: false, length: 255 }),
    __metadata("design:type", String)
], DeviceEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'location', unique: false, length: 64 }),
    __metadata("design:type", String)
], DeviceEntity.prototype, "location", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'ip', length: 128, nullable: false }),
    __metadata("design:type", String)
], DeviceEntity.prototype, "ip", void 0);
__decorate([
    typeorm_1.OneToMany(type => device_meta_entity_1.DeviceMetaEntity, deviceMetaEntity => deviceMetaEntity.deviceEntity, {
        cascade: ['insert']
    }),
    __metadata("design:type", Array)
], DeviceEntity.prototype, "deviceMetaEntity", void 0);
DeviceEntity = __decorate([
    typeorm_1.Entity({ name: 'devices' })
], DeviceEntity);
exports.DeviceEntity = DeviceEntity;
//# sourceMappingURL=device.entity.js.map