import { Request, Response } from 'express';
import { Delete, Get, Patch, Post, Route, Tags } from 'tsoa';

@Route('assignments')
@Tags('assignments')
export default class AssignmentsController {
    @Post('/')
    public async create(req: Request, res: Response) {}

    @Get('/')
    public async getAssignments(req: Request, res: Response) {}

    @Get('/:id')
    public async getAssignment(req: Request, res: Response) {}

    @Patch('/')
    public async patchAssignments(req: Request, res: Response) {}

    @Delete('/:id')
    public async deleteAssignments(req: Request, res: Response) {}
}
