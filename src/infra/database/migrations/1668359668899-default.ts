import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668359668899 implements MigrationInterface {
    name = 'default1668359668899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assignment_class_class" ("assignmentId" integer NOT NULL, "classId" integer NOT NULL, CONSTRAINT "PK_275f09e0985d07e9f5dcf031774" PRIMARY KEY ("assignmentId", "classId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_47dd03d11b6f69d5de34337aab" ON "assignment_class_class" ("assignmentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4335af766a42fe9c8a720e0e8b" ON "assignment_class_class" ("classId") `);
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '"2022-11-13T17:14:30.440Z"'`);
        await queryRunner.query(`ALTER TABLE "assignment_class_class" ADD CONSTRAINT "FK_47dd03d11b6f69d5de34337aab4" FOREIGN KEY ("assignmentId") REFERENCES "assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "assignment_class_class" ADD CONSTRAINT "FK_4335af766a42fe9c8a720e0e8b4" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignment_class_class" DROP CONSTRAINT "FK_4335af766a42fe9c8a720e0e8b4"`);
        await queryRunner.query(`ALTER TABLE "assignment_class_class" DROP CONSTRAINT "FK_47dd03d11b6f69d5de34337aab4"`);
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '2022-11-13'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4335af766a42fe9c8a720e0e8b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_47dd03d11b6f69d5de34337aab"`);
        await queryRunner.query(`DROP TABLE "assignment_class_class"`);
    }

}
