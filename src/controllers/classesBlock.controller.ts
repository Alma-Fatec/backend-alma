import { Request, Response } from 'express';
import { Delete, Get, Patch, Post, Route, Tags } from 'tsoa';
import { In } from 'typeorm';
import { ValidationError } from 'yup';
import { ApiError } from '../middlewares/error';
import { blockRepository } from '../repositories/block.repository';
import { userRepository } from '../repositories/user.repository';
import { DeleteClassesBlockService } from '../services/classesBlock/deleteClassesBlock.service';
import { classesBlockSchema } from '../validators/classesBlock';
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

        const userIds = [...new Set(body.users)] ?? [];

        /**
         * @TODO - check if users exists
         * @TODO - check if users are teachers
         * @TODO - check if users are already in a block
         */

        //@ts-ignore
        const users = await userRepository.findBy({ id: In(userIds) });

        const block = blockRepository.create({
            ...body,
            //@ts-ignore
            created_by: req.userId,
            //@ts-ignore
            cover: file?.location ?? null,
            users,
        });

        const result = await blockRepository.save(block);

        return res.status(201).json({ ...result, users: userIds });
    }

    @Get('/')
    public async getBlocks(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const user_ids = (req.query.user_ids as string)?.split(',') || [];

        //?user_ids=d3ef5420-263c-453b-9e7e-92ab80171850

        const where = user_ids.length > 0 ? { id: In(user_ids) } : {};

        const blocks = await blockRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['users'],
            where: {
                users: where,
            },
        });

        return res.json({
            page,
            limit,
            data: blocks,
        });
    }

    @Get('/:id')
    public async getBlock(req: Request, res: Response) {
        const { id } = req.params;

        const block = await blockRepository.findOne({
            where: { id },
            relations: ['users'],
        });

        if (!block) {
            throw new ApiError('Esse bloco não existe.', 400);
        }

        return res.json(block);
    }

    @Patch('/:id')
    public async pathBlocks(req: Request, res: Response) {
        const { body, file, params } = req;

        try {
            await classesBlockSchema.validate(body);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ApiError(error.errors.join(' '), 400);
            }
        }

        const block = await blockRepository.findOne({
            where: { id: String(params.id) },
            relations: ['users'],
        });

        if (!block) {
            throw new ApiError('Esse bloco não existe.', 400);
        }

        const userIds = body.users ?? [];

        const users = await userRepository.findBy({ id: In(userIds) });

        // update block with request data, keep the same cover if no new file is provided, keep the same users if no new users are provided,
        const updatedBlock = blockRepository.merge(block, {
            ...body,
            //@ts-ignore
            cover: file?.location ?? block.cover,
            users,
        });

        return res.json({ ...updatedBlock });
    }

    @Delete('/:id')
    public async removeBlock(req: Request, res: Response) {
        const { id } = req.params;
        
        const result = await new DeleteClassesBlockService().execute(id);

        return res.status(200).json(result);
    }
}
