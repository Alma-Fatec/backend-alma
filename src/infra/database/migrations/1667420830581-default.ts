import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667420830581 implements MigrationInterface {
    name = 'default1667420830581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "class" ("id" SERIAL NOT NULL, "order" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "cover" character varying NOT NULL, "blockId" uuid, CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "block" ADD "created_by" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "socialName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '"2022-11-02T20:27:12.578Z"'`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "FK_b35f12887018d890a040806d3cc" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_b35f12887018d890a040806d3cc"`);
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '2022-10-19'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "socialName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "created_by"`);
        await queryRunner.query(`DROP TABLE "class"`);
    }

}
