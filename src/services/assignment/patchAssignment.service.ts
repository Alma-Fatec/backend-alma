import { ApiError } from '../../middlewares/error';
import { assignmentRepository } from '../../repositories/assignment.repository';

export class UpdateAssignmentService {
    async execute(params) {
        const { id, name, description, cover, teacher, students } = params;

        const classExists = await assignmentRepository.findOne({
            where: { id: Number(id) },
        });

        if (!classExists) {
            throw new ApiError('Classe não encontrada', 404);
        }

        const classUpdated = await assignmentRepository.save({
            ...classExists,
            name,
            description,
            cover,
            teacher,
            students,
        });

        return classUpdated;
    }
}
