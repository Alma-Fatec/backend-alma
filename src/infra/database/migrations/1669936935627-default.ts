import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1669936935627 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "class" ADD CONSTRAINT "FK_b35f12887018d890a040806d3cc" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
