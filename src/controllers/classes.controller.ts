import { Request, Response } from 'express';
import { Post, Route, Tags } from 'tsoa';
import { Class } from '../entities/class';
import { CreateClassesService } from '../services/classes/createClasses.service';

const createClassesService = new CreateClassesService();

@Route('classes')
@Tags('classes')
export default class ClassesController {
    @Post('/')
    public async create(req: Request, res: Response) {
        const { body }: { body: Class } = req;

        const result = await createClassesService.execute(body);

        return res.status(201).json(result);
    }

   /*  @Get('/')
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
    } */
}
