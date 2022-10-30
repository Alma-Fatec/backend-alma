import { DataSource } from 'typeorm';

const migrationsPath = process.env.TYPEORM_MIGRATIONS_DIR as string;
const entitiesPath = process.env.TYPEORM_MIGRATIONS as string;

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [entitiesPath],
    migrations: [`${migrationsPath}/*.ts`],
    database: process.env.DATABASE_NAME,
});

AppDataSource.initialize()
    .then(() => {
        console.log('💾: Base de dados conectada com sucesso!');
    })
    .catch((err) => {
        console.error('❌: Erro na inicialização do banco de dados', err);
    });
