import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1669936884753 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "class" DROP CONSTRAINT "FK_b35f12887018d890a040806d3cc"`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
