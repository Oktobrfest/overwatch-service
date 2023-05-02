"use strict";
/* tslint:disable:naming-convention */
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const _ = require("lodash");
/**
 * @description trim spaces from start and end, replace multiple spaces with one.
 * @example
 * @ApiModelProperty()
 * @IsString()
 * @Trim()
 * name: string;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
function Trim() {
    return class_transformer_1.Transform((value) => {
        if (_.isArray(value)) {
            return value.map(v => _.trim(v).replace(/\s\s+/g, ' '));
        }
        return _.trim(value).replace(/\s\s+/g, ' ');
    });
}
exports.Trim = Trim;
/**
 * @description convert string or number to integer
 * @example
 * @IsNumber()
 * @ToInt()
 * name: number;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
function ToInt() {
    return class_transformer_1.Transform(value => parseInt(value, 10), { toClassOnly: true });
}
exports.ToInt = ToInt;
/**
 * @description transforms to array, specially for query params
 * @example
 * @IsNumber()
 * @ToArray()
 * name: number;
 * @constructor
 */
function ToArray() {
    return class_transformer_1.Transform(value => {
        if (_.isNil(value)) {
            return [];
        }
        return _.castArray(value);
    }, { toClassOnly: true });
}
exports.ToArray = ToArray;
//# sourceMappingURL=transforms.decorator.js.map