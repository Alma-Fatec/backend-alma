import { ClassesBlock, Users } from '@prisma/client';
import { Body, Get, Post, Route, Tags } from 'tsoa';
import { CreateClassesBlockService } from '../services/classesBlock/createClassesBlock.service';
import { CreateUserService } from '../services/user/createUser.service';
import { ListUserService } from '../services/user/listUser.service';

@Route('classesBlock')
@Tags('classesBlock')
export default class ClassesBlockController {
    @Post('/')
    public async create(
        @Body() body: ClassesBlock,
    ): Promise<Error | ClassesBlock> {
        const createClassesBlockService = new CreateClassesBlockService();

        const result = await createClassesBlockService.execute({
            ...body,
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
