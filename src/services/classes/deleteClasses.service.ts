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

        classToDelete.block.filter((block) => {
            return block.classes.filter((classes) => {
                return classes.id !== classToDelete.id;
            });
        });

        await classRepository.delete(id);

        return classToDelete;
    }
}
