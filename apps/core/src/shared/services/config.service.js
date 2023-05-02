"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const snake_naming_strategy_1 = require("../../snake-naming.strategy");
class ConfigService {
    constructor() {
        const nodeEnv = this.nodeEnv;
        dotenv.config({
            path: `.${nodeEnv}.env`,
        });
        // Replace \\n with \n to support multiline strings in AWS
        for (const envName of Object.keys(process.env)) {
            process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
        }
        console.info(process.env);
    }
    get(key) {
        return process.env[key];
    }
    getNumber(key) {
        return Number(this.get(key));
    }
    get nodeEnv() {
        return this.get('NODE_ENV') || 'development';
    }
    /**
     *
     */
    get typeOrmConfig() {
        let entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
        let migrations = [__dirname + '/../../migrations/*{.ts,.js}'];
        if (module.hot) {
            const entityContext = require.context('./../../modules', true, /\.entity\.ts$/);
            entities = entityContext.keys().map(id => {
                const entityModule = entityContext(id);
                const [entity] = Object.values(entityModule);
                return entity;
            });
            const migrationContext = require.context('./../../migrations', false, /\.ts$/);
            migrations = migrationContext.keys().map(id => {
                const migrationModule = migrationContext(id);
                const [migration] = Object.values(migrationModule);
                return migration;
            });
        }
        return {
            entities,
            migrations,
            keepConnectionAlive: true,
            type: 'postgres',
            host: this.get('POSTGRES_HOST'),
            port: this.getNumber('POSTGRES_PORT'),
            username: this.get('POSTGRES_USERNAME'),
            password: this.get('POSTGRES_PASSWORD'),
            database: this.get('POSTGRES_DATABASE'),
            schema: this.get('POSTGRES_SCHEMA'),
            migrationsRun: false,
            logging: this.nodeEnv === 'development',
            namingStrategy: new snake_naming_strategy_1.SnakeNamingStrategy(),
        };
    }
    get awsS3Config() {
        return {
            accessKeyId: this.get('AWS_S3_ACCESS_KEY_ID'),
            secretAccessKey: this.get('AWS_S3_SECRET_ACCESS_KEY'),
            bucketName: this.get('S3_BUCKET_NAME'),
        };
    }
    get clicksendConfig() {
        return {
            accountSid: this.get('T_ACCOUNT_SID'),
            authToken: this.get('T_ACCOUNT_TOKEN'),
        };
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map