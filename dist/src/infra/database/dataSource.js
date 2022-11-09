"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const migrationsPath = process.env.TYPEORM_MIGRATIONS_DIR;
const entitiesPath = process.env.TYPEORM_MIGRATIONS;
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [entitiesPath],
    migrations: [`${migrationsPath}/*.ts`],
    database: process.env.DATABASE_NAME,
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('💾: Base de dados conectada com sucesso!');
})
    .catch((err) => {
    console.error('❌: Erro na inicialização do banco de dados', err);
});
