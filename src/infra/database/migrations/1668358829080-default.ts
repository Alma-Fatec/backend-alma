import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668358829080 implements MigrationInterface {
    name = 'default1668358829080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignment" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '"2022-11-13T17:00:30.735Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '2022-11-13'`);
        await queryRunner.query(`ALTER TABLE "assignment" DROP COLUMN "title"`);
    }

}
