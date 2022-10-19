import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666211754251 implements MigrationInterface {
    name = 'default1666211754251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "cover" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '"2022-10-19T20:35:56.122Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '2022-09-11'`);
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "cover" SET NOT NULL`);
    }

}
