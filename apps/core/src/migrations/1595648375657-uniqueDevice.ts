import {MigrationInterface, QueryRunner} from "typeorm";

export class uniqueDevice1595648375657 implements MigrationInterface {
    name = 'uniqueDevice1595648375657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "UQ_60d13d94fcf9362b2ae4dd1108a" UNIQUE ("client_id")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "UQ_60d13d94fcf9362b2ae4dd1108a"`, undefined);
    }

}
