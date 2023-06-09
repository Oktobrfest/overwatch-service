"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const _ = require("lodash");
class UtilsService {
    static toDto(model, entity, options) {
        if (_.isArray(entity)) {
            return entity.map(u => new model(u, options));
        }
        return new model(entity, options);
    }
    /**
     * generate hash from password or string
     * @param {string} password
     * @returns {string}
     */
    static generateHash(password) {
        return bcrypt.hashSync(password, 10);
    }
    /**
     * generate random string
     * @param length
     */
    static generateRandomString(length) {
        return Math.random()
            .toString(36)
            .replace(/[^a-zA-Z0-9]+/g, '')
            .substr(0, length);
    }
    /**
     * validate text with hash
     * @param {string} password
     * @param {string} hash
     * @returns {Promise<boolean>}
     */
    static validateHash(password, hash) {
        return bcrypt.compare(password, hash || '');
    }
}
exports.UtilsService = UtilsService;
//# sourceMappingURL=utils.service.js.map