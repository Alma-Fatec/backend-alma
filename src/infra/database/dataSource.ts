import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
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
