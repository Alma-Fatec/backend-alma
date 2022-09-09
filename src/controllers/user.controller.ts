import { Users } from '@prisma/client';
import { Body, Get, Post, Route, Tags } from 'tsoa';
import { CreateUserService } from '../services/user/createUser.service';
import { ListUserService } from '../services/user/listUser.service';

@Route('users')
@Tags('User')
export default class UserController {
    @Post('/')
    public async create(@Body() body: Users): Promise<Error | Users> {
        const { name, social_name, cpf, phone, email, password } = body;

        const createUserService = new CreateUserService();

        const result = await createUserService.execute({
            name,
            social_name,
            cpf,
            phone,
            email,
            password,
            classesBlockId: null,
        });

        return result;
    }

    @Get('/')
    public async getUsers(): Promise<Error | Users[]> {
        const listUserService = new ListUserService();

        const result = await listUserService.execute();

        return result;
    }
}
