import { ApiError } from '../../middlewares/error';
import { assignmentRepository } from '../../repositories/assignment.repository';

interface ParamsProps {
    id: string;
}
export class FindAssignmentService {
    async execute(params: ParamsProps) {
        const classExists = await assignmentRepository.findOne({
            where: { id: Number(params.id) },
        });

        if (!classExists) {
            throw new ApiError('Atividade não encontrada', 404);
        }

        return classExists;
    }
}
