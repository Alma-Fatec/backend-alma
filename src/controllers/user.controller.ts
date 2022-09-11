import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { Get, Patch, Post, Route, Tags } from 'tsoa';
import { ValidationError } from 'yup';
import { User } from '../entities/user';
import { Roles } from '../entities/roles';
import { ApiError } from '../middlewares/error';
import { userRepository } from '../repositories/user.repository';
import { userSchema } from '../validators/user';

const roles: Roles[] = ['Admin', 'Student', 'Teacher'];
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
    async getUsers(req: Request, res: Response) {
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;

        const users = await userRepository.find({
            take: limit,
            skip: limit * (page - 1),
        });

        return res.json({
            page,
            limit,
            users,
        });
    }

    @Get('/:id')
    async getUser(req: Request, res: Response) {
        const { id } = req.params;

        const user = await userRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw new ApiError('Usuário não encontrado', 404);
        }

        return res.json(user);
    }

    @Patch('/:id')
    async promoteUser(req: Request, res: Response) {
        const { id } = req.params;
        const { role } = req.body;
        const user = await userRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw new ApiError('Usuário não encontrado', 404);
        }

        if (!roles.includes(role.trim() as Roles)) {
            throw new ApiError('Role inválida', 400);
        }

        await userRepository.update(user.id, {
            role: req.body.role,
        });

        return res.json({ ...user, role });
    }
}
