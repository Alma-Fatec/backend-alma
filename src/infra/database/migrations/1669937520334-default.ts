import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669937520334 implements MigrationInterface {
    name = 'default1669937520334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_b35f12887018d890a040806d3cc"`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "FK_b35f12887018d890a040806d3cc" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_b35f12887018d890a040806d3cc"`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "FK_b35f12887018d890a040806d3cc" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
