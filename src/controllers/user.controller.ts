import { Users } from '@prisma/client';
import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { Get, Post, Route, Tags } from 'tsoa';
import { ValidationError } from 'yup';
import { User } from '../entities/user';
import { ApiError } from '../middlewares/error';
import { userRepository } from '../repositories/user.repository';
import { CreateUserService } from '../services/user/createUser.service';
import { ListUserService } from '../services/user/listUser.service';
import { userSchema } from '../validators/user';

@Route('users')
@Tags('User')
export default class UserController {
    protected userTable = userRepository;

    @Post('/')
    async create(req: Request, res: Response) {
        const { body }: { body: User } = req;

        try {
            userSchema.validateSync(body);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ApiError(error.errors.join(' '), 400);
            }
        }

        const emailAlreadyExists = await userRepository.findOne({
            where: { email: body.email },
        });

        if (emailAlreadyExists) {
            throw new ApiError('Esse email já está em uso', 400);
        }

        const cpfAlreadyExists = await userRepository.findOne({
            where: { cpf: String(body.cpf) },
        });

        if (cpfAlreadyExists) {
            throw new ApiError('Esse cpf já foi cadastrado', 400);
        }

        const passwordHash = await hash(body.password, 8);

        const user = await userRepository.create({
            ...body,
            cpf: String(body.cpf),
            password: passwordHash,
            isActive: true,
            role: 'Student',
        });

        const result = await userRepository.save(user);

        return res.status(201).json(result);
    }

    @Get('/')
    async getUsers(): Promise<Error | Users[]> {
        const listUserService = new ListUserService();

        const result = await listUserService.execute();

        return result;
    }
}
