"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSessionService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class CreateSessionService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async execute({ email, password, }) {
        const user = await this.prisma.users.findUnique({ where: { email } });
        if (!user) {
            return new Error('Esse usuário não existe.');
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(password, user.password);
        if (!passwordMatch) {
            return new Error('Usuário ou senha incorretos.');
        }
        const token = (0, jsonwebtoken_1.sign)({}, String(process.env.APP_SECRET), {
            subject: user.id,
            expiresIn: '7h',
        });
        return { token };
    }
}
exports.CreateSessionService = CreateSessionService;
