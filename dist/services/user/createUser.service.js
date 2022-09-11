"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const uuid_1 = require("uuid");
const prisma_1 = __importDefault(require("../prisma"));
class CreateUserService {
    constructor() {
        this.prisma = prisma_1.default;
    }
    async execute({ name, social_name, cpf, phone, email, password, }) {
        const emailAlreadyExists = await this.prisma.users.findUnique({
            where: { email: email },
        });
        const cpfAlreadyExists = await this.prisma.users.findUnique({
            where: { cpf: String(cpf) },
        });
        if (emailAlreadyExists) {
            return new Error('Esse email já está em uso');
        }
        if (cpfAlreadyExists) {
            return new Error('Esse cpf já foi cadastrado');
        }
        const passwordHash = await (0, bcryptjs_1.hash)(password, 8);
        const user = await this.prisma.users.create({
            data: {
                id: (0, uuid_1.v4)(),
                name,
                social_name,
                cpf,
                email,
                phone,
                password: passwordHash,
                is_active: false,
            },
        });
        return user;
    }
}
exports.CreateUserService = CreateUserService;
