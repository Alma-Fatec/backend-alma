"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
});
AppDataSource.initialize()
    .then(() => {
    console.log('💾: Base de dados conectada com sucesso!');
})
    .catch((err) => {
    console.error('❌: Erro na inicialização do banco de dados', err);
});
