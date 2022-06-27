import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

type UserRequest = {
    email: string;
    password: string;
};

export class CreateSessionService {
    protected prisma = new PrismaClient();

    async execute({
        email,
        password,
    }: UserRequest): Promise<{ token: string } | Error> {
        const user = await this.prisma.users.findUnique({ where: { email } });

        if (!user) {
            return new Error('Esse usuário não existe.');
        }

        const passwordMatch = await compare(password, user.password);

        console.log(user);

        if (!passwordMatch) {
            return new Error('Usuário ou senha incorretos.');
        }

        const token = sign({}, String(process.env.APP_SECRET), {
            subject: user.id,
            expiresIn: '7h',
        });
        return { token };
    }
}
