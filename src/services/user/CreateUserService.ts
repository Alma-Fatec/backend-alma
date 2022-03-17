import { PrismaClient, Users } from '@prisma/client';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

type UserRequest = {
    name: string;
    social_name: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
};

export class CreateUserService {
    protected prisma = new PrismaClient();

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
            where: { cpf: cpf },
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
