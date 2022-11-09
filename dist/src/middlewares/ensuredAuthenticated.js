"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensuredAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const ensuredAuthenticated = () => {
    return async (request, response, next) => {
        const authHeaders = request.headers.authorization;
        if (!authHeaders) {
            return response.status(401).json({ error: 'Token inválido' });
        }
        const [, token] = authHeaders.split(' ');
        try {
            (0, jsonwebtoken_1.verify)(token, String(process.env.APP_SECRET));
            //@ts-ignore
            const { sub } = (0, jsonwebtoken_1.decode)(token);
            //@ts-ignore
            request.userId = sub;
            return next();
        }
        catch (err) {
            return response.status(401).json({ error: 'Não autorizado' });
        }
    };
};
exports.ensuredAuthenticated = ensuredAuthenticated;
