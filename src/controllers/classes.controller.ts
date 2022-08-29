import { Classes, Users } from '@prisma/client';
import { Body, Delete, Get, Patch, Post, Query, Route, Tags } from 'tsoa';
import { CreateClassesService } from '../services/classes/createClasses.service';
import { DeleteClassesService } from '../services/classes/deleteClasses.service';
import { ListClassesService } from '../services/classes/listClasses.service';
import { PatchClassesService } from '../services/classes/patchClasses.service';
import { CreateUserService } from '../services/user/createUser.service';
import { ListUserService } from '../services/user/listUser.service';

@Route('classes')
@Tags('classes')
export default class ClassesController {
    @Post('/')
    public async create(@Body() body: Classes): Promise<Error | Classes> {
        const createClassesService = new CreateClassesService();

        const result = await createClassesService.execute({
            ...body,
        });

        return result;
    }

    @Get('/')
    public async getClasses(): Promise<Error | Classes[]> {
        const listUserService = new ListClassesService();

        const result = await listUserService.execute();

        return result;
    }

    @Patch('/')
    public async patchClasses(
        @Query('id') id: number,
        @Body() body: Classes,
    ): Promise<Error | Classes> {
        console.log('id do recurso>:', id);

        const listUserService = new PatchClassesService();

        const result = await listUserService.execute(id, body);

        return result;
    }

    @Delete('/')
    public async removeClasses(
        @Query('id') id: number,
    ): Promise<Error | Classes> {
        console.log('id do recurso>:', id);

        const listUserService = new DeleteClassesService();

        const result = await listUserService.execute(id);

        return result;
    }
}
