"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1665767489130 = void 0;
class default1665767489130 {
    async up(queryRunner) {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    }
    async down(queryRunner) { }
}
exports.default1665767489130 = default1665767489130;
