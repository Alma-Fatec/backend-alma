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
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;


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

    @Patch('/:id')
    public async pathBlocks() {}

    @Delete('/:id')
    public async removeBlock(req: Request, res: Response) {
        const { id } = req.params;
    }
}
