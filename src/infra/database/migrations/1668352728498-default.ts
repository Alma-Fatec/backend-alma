import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668352728498 implements MigrationInterface {
    name = 'default1668352728498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "cover" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '"2022-11-13T15:18:50.003Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '2022-11-02'`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "cover" SET NOT NULL`);
    }

}
