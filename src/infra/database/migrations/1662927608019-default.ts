import { MigrationInterface, QueryRunner } from "typeorm";

export class default1662927608019 implements MigrationInterface {
    name = 'default1662927608019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "block" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "cover" text NOT NULL, "createdAt" date NOT NULL DEFAULT '"2022-09-11T20:20:09.885Z"', CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "block_users_user" ("blockId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_eeadeb1f565f9126f820a5078e3" PRIMARY KEY ("blockId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_14d15c104c76ba73c8587aa97e" ON "block_users_user" ("blockId") `);
        await queryRunner.query(`CREATE INDEX "IDX_128cab81731787faac7107f58f" ON "block_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "block_users_user" ADD CONSTRAINT "FK_14d15c104c76ba73c8587aa97e6" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "block_users_user" ADD CONSTRAINT "FK_128cab81731787faac7107f58fb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block_users_user" DROP CONSTRAINT "FK_128cab81731787faac7107f58fb"`);
        await queryRunner.query(`ALTER TABLE "block_users_user" DROP CONSTRAINT "FK_14d15c104c76ba73c8587aa97e6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_128cab81731787faac7107f58f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_14d15c104c76ba73c8587aa97e"`);
        await queryRunner.query(`DROP TABLE "block_users_user"`);
        await queryRunner.query(`DROP TABLE "block"`);
    }

}
