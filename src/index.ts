import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './routes';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

//import swaggerDocs from './swagger.json';

const app = express();

app.use(express.json());

app.use(morgan('dev'));
app.use(express.static('public'));

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: '/swagger.json',
        },
    }),
);
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`🦜: App rodando na porta ${process.env.PORT}!`);
});
