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
class uniqueDevice1595648375657 {
    constructor() {
        this.name = 'uniqueDevice1595648375657';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "UQ_60d13d94fcf9362b2ae4dd1108a" UNIQUE ("client_id")`, undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "UQ_60d13d94fcf9362b2ae4dd1108a"`, undefined);
        });
    }
}
exports.uniqueDevice1595648375657 = uniqueDevice1595648375657;
//# sourceMappingURL=1595648375657-uniqueDevice.js.map