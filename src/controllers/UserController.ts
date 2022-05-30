import { Users } from '@prisma/client';
import { Request, Response } from 'express';
import { Body, Controller, Get, Route } from 'tsoa';
import { CreateUserService } from '../services/user/CreateUserService';
import { ListUserService } from '../services/user/ListUserService';

@Route('user')
export class UserController extends Controller {
    async create(request: Request, response: Response) {
        const { name, social_name, cpf, phone, email, password } = request.body;

        const createUserService = new CreateUserService();

        const result = await createUserService.execute({
            name,
            social_name,
            cpf,
            phone,
            email,
            password,
        });

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }

        return response.status(201).send(result);
    }

    @Get('/')
    async index(_request: Request, response: Response) {
        const listUserService = new ListUserService();

        const result = await listUserService.execute();

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }

        return response.status(200).json({ result });
    }
}
