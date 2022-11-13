import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668355841156 implements MigrationInterface {
    name = 'default1668355841156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "options" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "file" character varying, "is_correct" boolean NOT NULL, "assignmentId" integer, CONSTRAINT "PK_d232045bdb5c14d932fba18d957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assignment" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "kind" character varying NOT NULL, "file" character varying, "answer" character varying, CONSTRAINT "PK_43c2f5a3859f54cedafb270f37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '"2022-11-13T16:10:43.018Z"'`);
        await queryRunner.query(`ALTER TABLE "options" ADD CONSTRAINT "FK_3584d15916b0e6879f1c3786401" FOREIGN KEY ("assignmentId") REFERENCES "assignment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "options" DROP CONSTRAINT "FK_3584d15916b0e6879f1c3786401"`);
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '2022-11-13'`);
        await queryRunner.query(`DROP TABLE "assignment"`);
        await queryRunner.query(`DROP TABLE "options"`);
    }

}
