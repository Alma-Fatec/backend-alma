import { Request, Response } from 'express';
import { Get, Patch, Post, Route, Tags } from 'tsoa';
import { Roles } from '../entities/roles';
import { User } from '../entities/user';
import { ApiError } from '../middlewares/error';
import { userRepository } from '../repositories/user.repository';
import { CreateUserService } from '../services/user/createUser.service';

const roles: Roles[] = ['Admin', 'Student', 'Teacher'];

const createUserService = new CreateUserService();

@Route('users')
@Tags('User')
export default class UserController {
    protected userTable = userRepository;
    @Post('/')
    async create(req: Request, res: Response) {
        const { body }: { body: User } = req;

        const result = await createUserService.execute(body);

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
