import { Users } from '@prisma/client';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import prisma from '../prisma';

type UserRequest = Omit<Users, 'id' | 'is_active' | 'createdAt' | 'updatedAt'>;

export class CreateUserService {
    protected prisma = prisma;

    async execute({
        name,
        social_name,
        cpf,
        phone,
        email,
        password,
    }: UserRequest): Promise<Users | Error> {
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

        const passwordHash = await hash(password, 8);

        const user = await this.prisma.users.create({
            data: {
                id: uuid(),
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
