"use strict";
/* tslint:disable:naming-convention */
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
/**
 * Does this meet all of the criteria to be a password
 *
 * @param validationOptions
 * @constructor
 */
function IsPassword(validationOptions) {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            propertyName,
            name: 'isPassword',
            target: object.constructor,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, _args) {
                    return /^[a-zA-Z0-9!@#$%^&*]*$/.test(value);
                },
            },
        });
    };
}
exports.IsPassword = IsPassword;
//# sourceMappingURL=validators.decorator.js.map