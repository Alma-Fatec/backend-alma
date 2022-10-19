import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1665767489130 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
