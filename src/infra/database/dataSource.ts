import { DataSource } from 'typeorm';

const port = process.env.DB_PORT as number | undefined;

const migrationsPath = process.env.TYPEORM_MIGRATIONS_DIR as string;
const entitiesPath = process.env.TYPEORM_MIGRATIONS as string;

console.log('migrations path: ', migrationsPath);
console.log('entity path: ', entitiesPath);
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    url: process.env.TYPEORM_URL,
    entities: [entitiesPath],
    migrations: [migrationsPath],
});

AppDataSource.initialize()
    .then(() => {
        console.log('💾: Base de dados conectada com sucesso!');
    })
    .catch((err) => {
        console.error('❌: Erro na inicialização do banco de dados', err);
    });
