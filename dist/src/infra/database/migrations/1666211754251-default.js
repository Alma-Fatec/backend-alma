"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1666211754251 = void 0;
class default1666211754251 {
    constructor() {
        this.name = 'default1666211754251';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "cover" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '"2022-10-19T20:35:56.122Z"'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "createdAt" SET DEFAULT '2022-09-11'`);
        await queryRunner.query(`ALTER TABLE "block" ALTER COLUMN "cover" SET NOT NULL`);
    }
}
exports.default1666211754251 = default1666211754251;
