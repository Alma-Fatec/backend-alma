import { ApiError } from '../../middlewares/error';
import { assignmentRepository } from '../../repositories/assignment.repository';

export class DeleteAssignmentService {
    async execute(id: number) {
        const classExists = await assignmentRepository.findOne({
            where: { id },
        });

        if (!classExists) {
            throw new ApiError('Classe não encontrada', 404);
        }

        await assignmentRepository.delete(id);

        return classExists;
    }
}
