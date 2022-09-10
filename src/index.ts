import 'reflect-metadata';

import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Router from './routes';
import swaggerUi from 'swagger-ui-express';

import cors from 'cors';
const whitelist = ['*'];

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(
    cors({
        origin: whitelist,
    }),
);

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: '/swagger.json',
        },
    }),
);

app.use(Router);

app.listen(process.env.PORT, () => {
    console.log(`🦜: App rodando em http://localhost:${process.env.PORT}`);
});
