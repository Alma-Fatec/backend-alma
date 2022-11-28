import { Request, Response } from 'express';
import { Delete, Get, Patch, Post, Route, Tags } from 'tsoa';
import { CreateAssignmentService } from '../services/assignment/createAssignment.service';
import { DeleteAssignmentService } from '../services/assignment/deleteAssignment.service';
import { FindAssignmentService } from '../services/assignment/findAssignment.service';
import { ListAssignmentService } from '../services/assignment/listAssignment.service';
import { UpdateAssignmentService } from '../services/assignment/patchAssignment.service';

@Route('assignments')
@Tags('assignments')
export default class AssignmentsController {
    @Post('/')
    public async create(req: Request, res: Response) {
        const { body, file } = req;

        //@ts-ignore
        body.file = file?.location || null;
        const result = await new CreateAssignmentService().execute(body);

        return res.status(200).json(result);
    }

    @Get('/')
    public async getAssignments(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const classId = Number(req.query.classId);

        const result = await new ListAssignmentService().execute({
            page,
            limit,
            classId,
        });

        return res.status(200).json(result);
    }

    @Get('/:id')
    public async getAssignment(req: Request, res: Response) {
        const { id } = req.params;

        const result = await new FindAssignmentService().execute({ id });

        return res.status(200).json(result);
    }

    @Patch('/')
    public async patchAssignments(req: Request, res: Response) {
        const { body, file } = req;

        //@ts-ignore
        body.file = file?.location || null;
        const result = await new UpdateAssignmentService().execute(body);

        return res.status(200).json(result);
    }

    @Delete('/:id')
    public async deleteAssignments(req: Request, res: Response) {
        const { id } = req.params;

        const result = await new DeleteAssignmentService().execute(Number(id));

        return res.status(200).json(result);
    }
}
