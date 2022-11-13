import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668358295016 implements MigrationInterface {
    name = 'default1668358295016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "socialName" text, "cpf" text NOT NULL, "phone" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "isActive" boolean NOT NULL, "role" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "block" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "cover" text, "createdAt" date NOT NULL DEFAULT '"2022-11-13T16:51:36.552Z"', "created_by" character varying NOT NULL, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class" ("id" SERIAL NOT NULL, "order" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "cover" character varying, "blockId" uuid, CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "options" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "file" character varying, "is_correct" boolean NOT NULL, "assignmentId" integer, CONSTRAINT "PK_d232045bdb5c14d932fba18d957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assignment" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "kind" character varying NOT NULL, "file" character varying, "answer" character varying, "created_by" character varying, "updated_by" character varying, CONSTRAINT "PK_43c2f5a3859f54cedafb270f37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "block_users_user" ("blockId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_eeadeb1f565f9126f820a5078e3" PRIMARY KEY ("blockId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_14d15c104c76ba73c8587aa97e" ON "block_users_user" ("blockId") `);
        await queryRunner.query(`CREATE INDEX "IDX_128cab81731787faac7107f58f" ON "block_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "FK_b35f12887018d890a040806d3cc" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "options" ADD CONSTRAINT "FK_3584d15916b0e6879f1c3786401" FOREIGN KEY ("assignmentId") REFERENCES "assignment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "block_users_user" ADD CONSTRAINT "FK_14d15c104c76ba73c8587aa97e6" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "block_users_user" ADD CONSTRAINT "FK_128cab81731787faac7107f58fb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block_users_user" DROP CONSTRAINT "FK_128cab81731787faac7107f58fb"`);
        await queryRunner.query(`ALTER TABLE "block_users_user" DROP CONSTRAINT "FK_14d15c104c76ba73c8587aa97e6"`);
        await queryRunner.query(`ALTER TABLE "options" DROP CONSTRAINT "FK_3584d15916b0e6879f1c3786401"`);
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_b35f12887018d890a040806d3cc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_128cab81731787faac7107f58f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_14d15c104c76ba73c8587aa97e"`);
        await queryRunner.query(`DROP TABLE "block_users_user"`);
        await queryRunner.query(`DROP TABLE "assignment"`);
        await queryRunner.query(`DROP TABLE "options"`);
        await queryRunner.query(`DROP TABLE "class"`);
        await queryRunner.query(`DROP TABLE "block"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
