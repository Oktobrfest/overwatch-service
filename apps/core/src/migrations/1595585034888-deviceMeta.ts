import {MigrationInterface, QueryRunner} from "typeorm";

export class deviceMeta1595585034888 implements MigrationInterface {
    name = 'deviceMeta1595585034888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "deviceMeta" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "device_id" character varying(255) NOT NULL, "metaName" character varying(255), "metaType" character varying(3) NOT NULL, "units" character varying(64) NOT NULL, "ip" character varying(128) NOT NULL, CONSTRAINT "PK_034accc2ae1324b0207877bb6a0" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "deviceMeta"`, undefined);
    }

}
