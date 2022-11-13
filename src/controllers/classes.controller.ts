import { Request, Response } from 'express';
import { Delete, Get, Patch, Post, Route, Tags } from 'tsoa';
import { ValidationError } from 'yup';
import { Class } from '../entities/class';
import { ApiError } from '../middlewares/error';
import { CreateClassesService } from '../services/classes/createClasses.service';
import { DeleteClassService } from '../services/classes/deleteClasses.service';
import { FindClassService } from '../services/classes/findClass.service';
import { ListClassesService } from '../services/classes/listClasses.service';
import { UpdateClassesService } from '../services/classes/patchClasses.service';
import { classesSchema } from '../validators/classes';

const createClassesService = new CreateClassesService();

@Route('classes')
@Tags('classes')
export default class ClassesController {
    @Post('/')
    public async create(req: Request, res: Response) {
        const { body, file } = req;

        try {
            await classesSchema.validate(body);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ApiError(error.errors.join(' '), 400);
            }
        }

        // @ts-ignore
        body.cover = file?.location ?? null;
        const result = await createClassesService.execute(body);

        return res.status(201).json(result);
    }

    @Get('/')
    public async getClasses(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const blockId = req.query.blockId as string;

        const result = await new ListClassesService().execute({
            page,
            limit,
            blockId,
        });

        return res.status(200).json(result);
    }

    @Get('/:id')
    public async getClass(req: Request, res: Response) {
        const { id } = req.params;

        const result = await new FindClassService().execute({
            id,
        });

        return res.status(200).json(result);
    }

    @Patch('/')
    public async patchClasses(req: Request, res: Response) {
        const { id } = req.params;
        const { body, file } = req;

        const result = await new UpdateClassesService().execute({
            id,
            body,
            file,
        });

        return res.status(200).json(result);
    }

    @Delete('/:id')
    public async deleteClasses(req: Request, res: Response) {
        const { id } = req.params;

        const result = await new DeleteClassService().execute(Number(id));

        return res.status(200).json(result);
    }
}
