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
const DeviceMetaEntityDto_1 = require("./dto/DeviceMetaEntityDto");
const device_entity_1 = require("./device.entity");
let DeviceMetaEntity = class DeviceMetaEntity extends abstract_entity_1.AbstractEntity {
    constructor() {
        super(...arguments);
        this.dtoClass = DeviceMetaEntityDto_1.DeviceMetaEntityDto;
    }
};
__decorate([
    typeorm_1.ManyToOne(type => device_entity_1.DeviceEntity, {
        cascade: ['insert']
    }),
    typeorm_1.JoinColumn({
        name: "device_id",
        referencedColumnName: "id"
    }),
    __metadata("design:type", device_entity_1.DeviceEntity)
], DeviceMetaEntity.prototype, "deviceEntity", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'metaName', nullable: true, length: 255 }),
    __metadata("design:type", String)
], DeviceMetaEntity.prototype, "metaName", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'metaType', nullable: false, length: 3 }),
    __metadata("design:type", String)
], DeviceMetaEntity.prototype, "metaType", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'units', unique: false, length: 64 }),
    __metadata("design:type", String)
], DeviceMetaEntity.prototype, "units", void 0);
DeviceMetaEntity = __decorate([
    typeorm_1.Entity({ name: 'deviceMeta' })
], DeviceMetaEntity);
exports.DeviceMetaEntity = DeviceMetaEntity;
//# sourceMappingURL=device.meta.entity.js.map