import { Request, Response } from 'express';
import { Post, Route } from 'tsoa';
import { CreateUserService } from '../services/user/CreateUserService';

@Route('user')
export class UserController {
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
}
