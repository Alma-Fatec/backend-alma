import { DataSource } from 'typeorm';

const port = (process.env.DB_PORT as number | undefined) || 5432;

const migrationsPath = process.env.TYPEORM_MIGRATIONS_DIR as string;
const entitiesPath = process.env.TYPEORM_MIGRATIONS as string;

console.log('migrations path: ', migrationsPath);
console.log('entity path: ', entitiesPath);
console.log('db_port: ', port);
console.log('host: ', process.env.DB_HOST);

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [entitiesPath],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
});

AppDataSource.initialize()
    .then(() => {
        console.log('💾: Base de dados conectada com sucesso!');
    })
    .catch((err) => {
        console.error('❌: Erro na inicialização do banco de dados', err);
    });
