import { ClassesBlock, Users } from '@prisma/client';
import { Request, Response } from 'express';
import { Body, Delete, Get, Patch, Post, Query, Route, Tags } from 'tsoa';
import { In } from 'typeorm';
import { ValidationError } from 'yup';
import { ApiError } from '../middlewares/error';
import { blockRepository } from '../repositories/block.repository';
import { userRepository } from '../repositories/user.repository';
import { CreateClassesBlockService } from '../services/classesBlock/createClassesBlock.service';
import { DeleteClassesBlockService } from '../services/classesBlock/deleteClassesBlock.service';
import { ListClassesBlockService } from '../services/classesBlock/listClassesBlock.service';
import { PatchClassesBlockService } from '../services/classesBlock/patchClassesBlock.service';
import { classesBlockSchema } from '../validators/classesBlock';

const baseUrl = `http://localhost:${process.env.PORT}`;
interface CreateBlockRequest {
    body: ClassesBlock;
    file: Express.Multer.File;
}
@Route('classesBlock')
@Tags('classesBlock')
export default class ClassesBlockController {
    @Post('/')
    public async create(req: Request, res: Response) {
        const { body, file } = req;

        try {
            await classesBlockSchema.validate(body);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ApiError(error.errors.join(' '), 400);
            }
        }

        const userIds = body.user ?? [];

        console.log(file);

        const users = await userRepository.findBy({ id: In(userIds) });

        const block = blockRepository.create({
            ...body,
            cover: `${baseUrl}/${file?.path}` || '',
            users,
        });

        const result = await blockRepository.save(block);

        return res.status(201).json({ ...result, users: userIds });
    }

    @Get('/')
    public async getBlocks(req: Request, res: Response) {
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;

        const blocks = await blockRepository.find({
            skip: (page - 1) * limit,
            take: limit,
        });

        return res.json({
            page,
            limit,
            blocks,
        });
    }

    @Patch('/')
    public async pathBlocks() {
        /*    console.log('id do recurso>:', id);

        const listUserService = new PatchClassesBlockService();

        const result = await listUserService.execute(id, body);

        return result; */
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
