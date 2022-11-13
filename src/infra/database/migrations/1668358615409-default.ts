import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668358615409 implements MigrationInterface {
    name = 'default1668358615409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '"2022-11-13T16:56:57.013Z"'`);
        await queryRunner.query(`ALTER TABLE "assignment" DROP COLUMN "kind"`);
        await queryRunner.query(`ALTER TABLE "assignment" ADD "kind" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignment" DROP COLUMN "kind"`);
        await queryRunner.query(`ALTER TABLE "assignment" ADD "kind" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '2022-11-13'`);
    }

}
