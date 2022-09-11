import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';

export const ensuredAuthenticated = () => {
    return async (request: Request, response: Response, next: NextFunction) => {
        const authHeaders = request.headers.authorization;

        if (!authHeaders) {
            return response.status(401).json({ error: 'Token inválido' });
        }

        const [, token] = authHeaders.split(' ');

        try {
            verify(token, String(process.env.APP_SECRET));

            const {sub} = decode(token);

            //@ts-ignore
            request.userId = sub;

            return next();
        } catch (err) {
            return response.status(401).json({ error: 'Não autorizado' });
        }
    };
};
