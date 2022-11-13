import { ApiError } from '../../middlewares/error';
import { classRepository } from '../../repositories/class.repository';

export class DeleteClassService {
    async execute(id: number) {
        const classToDelete = await classRepository.findOne({
            where: { id },
        });

        if (!classToDelete) {
            throw new ApiError('Classe não encontrada', 404);
        }

        await classRepository.delete(id);

        return classToDelete;
    }
}
