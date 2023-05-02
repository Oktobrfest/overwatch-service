"use strict";
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
class deviceMeta1595585034888 {
    constructor() {
        this.name = 'deviceMeta1595585034888';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "deviceMeta" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "device_id" character varying(255) NOT NULL, "metaName" character varying(255), "metaType" character varying(3) NOT NULL, "units" character varying(64) NOT NULL, "ip" character varying(128) NOT NULL, CONSTRAINT "PK_034accc2ae1324b0207877bb6a0" PRIMARY KEY ("id"))`, undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "deviceMeta"`, undefined);
        });
    }
}
exports.deviceMeta1595585034888 = deviceMeta1595585034888;
//# sourceMappingURL=1595585034888-deviceMeta.js.map