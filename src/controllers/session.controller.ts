import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { Post, Route, Tags } from 'tsoa';
import { ApiError } from '../middlewares/error';
import { blockRepository } from '../repositories/block.repository';
import { userRepository } from '../repositories/user.repository';

interface LoginInfo {
    email: string;
    password: string;
}

@Route('session')
@Tags('Session')
export class SessionController {
    @Post('/login')
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await userRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new ApiError('Esse usuário não existe.', 400);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new ApiError('Usuário ou senha incorretos.', 400);
        }

        const token = sign({}, String(process.env.APP_SECRET), {
            subject: user.id,
            expiresIn: '7h',
        });

        const blocks = await blockRepository.find({
            where: { users: { id: user?.id } },
        });

        return res.status(201).json({ token, user: { ...user, blocks } });
    }

    @Post('/refresh')
    async refresh(req: Request, res: Response) {
        const { user_id } = req.body;

        const user = await userRepository.findOne({
            where: { id: user_id },
        });

        if (!user) {
            throw new ApiError('Esse usuário não existe.', 400);
        }

        const refreshToken = sign({}, String(process.env.APP_SECRET), {
            subject: user.id,
            expiresIn: '7h',
        });

        return res.status(201).json({ token: refreshToken });
    }
}
