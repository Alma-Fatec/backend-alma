import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667421697192 implements MigrationInterface {
    name = 'default1667421697192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '"2022-11-02T20:41:39.041Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '2022-11-02'`);
    }

}
