"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./apps/overwatch-core/src/boilerplate.polyfill");
const dotenv = require("dotenv");
const snake_naming_strategy_1 = require("./apps/overwatch-core/src/snake-naming.strategy");
if (!module.hot /* for webpack HMR */) {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}
dotenv.config({
    path: `.${process.env.NODE_ENV}.env`,
});
// Replace \\n with \n to support multiline strings in AWS
for (const envName of Object.keys(process.env)) {
    process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
}
module.exports = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    namingStrategy: new snake_naming_strategy_1.SnakeNamingStrategy(),
    entities: ['./apps/overwatch-core/src/modules/**/*.entity{.ts,.js}'],
    migrations: ['./apps/overwatch-core/src/migrations/*{.ts,.js}'],
};
//# sourceMappingURL=ormconfig.js.map