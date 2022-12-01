import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1669938336583 implements MigrationInterface {
    name = 'default1669938336583';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignment" ADD "options" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "assignment" DROP COLUMN "options"`,
        );
    }
}
