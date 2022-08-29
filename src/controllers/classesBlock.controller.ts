import { ClassesBlock, Users } from '@prisma/client';
import { Body, Delete, Get, Patch, Post, Query, Route, Tags } from 'tsoa';
import { CreateClassesBlockService } from '../services/classesBlock/createClassesBlock.service';
import { DeleteClassesBlockService } from '../services/classesBlock/deleteClassesBlock.service';
import { ListClassesBlockService } from '../services/classesBlock/listClassesBlock.service';
import { PatchClassesBlockService } from '../services/classesBlock/patchClassesBlock.service';

interface CreateBlockRequest {
    body: ClassesBlock;
    file: Express.Multer.File;
}
@Route('classesBlock')
@Tags('classesBlock')
export default class ClassesBlockController {
    @Post('/')
    public async create(
        @Body() req: CreateBlockRequest,
    ): Promise<Error | ClassesBlock> {
        const createClassesBlockService = new CreateClassesBlockService();

        const result = await createClassesBlockService.execute({
            ...req.body,
            cover:
                `http://${process.env.HOST}:${process.env.PORT}/${req.file?.path}` ||
                '',
        });

        return result;
    }

    @Get('/')
    public async getBlocks(): Promise<Error | ClassesBlock[]> {
        const listUserService = new ListClassesBlockService();

        const result = await listUserService.execute();

        return result;
    }

    @Patch('/')
    public async pathBlocks(
        @Query('id') id: number,
        @Body() body: ClassesBlock,
    ): Promise<Error | ClassesBlock> {
        console.log('id do recurso>:', id);

        const listUserService = new PatchClassesBlockService();

        const result = await listUserService.execute(id, body);

        return result;
    }

    @Delete('/')
    public async removeBlock(
        @Query('id') id: number,
    ): Promise<Error | ClassesBlock> {
        console.log('id do recurso>:', id);

        const listUserService = new DeleteClassesBlockService();

        const result = await listUserService.execute(id);

        return result;
    }
}
