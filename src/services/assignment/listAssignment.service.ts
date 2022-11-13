import { assignmentRepository } from '../../repositories/assignment.repository';

interface ParamsProps {
    page: number;
    limit: number;
    classId?: number;
}

export class ListAssignmentService {
    async execute(params: ParamsProps) {
        const where = params.classId
            ? {
                  class: { id: params.classId },
              }
            : {};

        const assignments = await assignmentRepository.find({
            skip: (params.page - 1) * params.limit,
            take: params.limit,
            where: where,
            order: {
                id: 'ASC',
            },
        });

        return {
            page: params.page,
            limit: params.limit,
            data: assignments,
        };
    }
}
