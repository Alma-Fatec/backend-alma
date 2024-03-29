import * as dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === 'development' ? 'dev.env' : '.env',
});

import 'reflect-metadata';
import 'express-async-errors';

import express, { Application } from 'express';
import morgan from 'morgan';
import routes from './routes';
import { errorMiddleware } from './middlewares/error';

import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import './infra/database/dataSource';

const app: Application = express();

// solve cors issues with frontend app (localhost:3000) and backend app (localhost:3333) 
app.use(cors());

app.use(express.json());

app.use(morgan('dev'));
app.use(express.static('public'));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(routes);
app.use(errorMiddleware);

/* app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: '/swagger.json',
        },
    }),
); */

app.listen(process.env.PORT, () => {
    console.log(`🦜: App rodando em http://localhost:${process.env.PORT}`);
});

export default app;
