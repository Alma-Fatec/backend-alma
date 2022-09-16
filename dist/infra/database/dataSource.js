"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const port = process.env.DB_PORT || 55003;
const migrationsPath = process.env.TYPEORM_MIGRATIONS_DIR;
const entitiesPath = process.env.TYPEORM_MIGRATIONS;
console.log('migrations path: ', migrationsPath);
console.log('entity path: ', entitiesPath);
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    url: process.env.TYPEORM_URL,
    entities: [entitiesPath],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('💾: Base de dados conectada com sucesso!');
})
    .catch((err) => {
    console.error('❌: Erro na inicialização do banco de dados', err);
});
