"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1662912303624 = void 0;
class default1662912303624 {
    constructor() {
        this.name = 'default1662912303624';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "socialName" text NOT NULL, "cpf" text NOT NULL, "phone" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "isActive" boolean NOT NULL, "role" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.default1662912303624 = default1662912303624;
