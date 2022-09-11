import 'reflect-metadata';
import 'express-async-errors';

import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';
import { errorMiddleware } from './middlewares/error';

import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

const whitelist = ['*'];

dotenv.config({
    path: process.env.NODE_ENV === 'development' ? '.env' : '.env.prod',
});

import './infra/database/dataSource';

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

app.use(routes);
app.use(errorMiddleware);

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: '/swagger.json',
        },
    }),
);

app.listen(process.env.PORT, () => {
    console.log(`🦜: App rodando em http://localhost:${process.env.PORT}`);
});
