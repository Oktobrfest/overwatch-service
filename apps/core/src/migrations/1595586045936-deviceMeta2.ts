import {MigrationInterface, QueryRunner} from "typeorm";

export class deviceMeta21595586045936 implements MigrationInterface {
    name = 'deviceMeta21595586045936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deviceMeta" DROP COLUMN "ip"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deviceMeta" ADD "ip" character varying(128) NOT NULL`, undefined);
    }

}
