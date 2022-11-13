import { ApiError } from '../../middlewares/error';
import { classRepository } from '../../repositories/class.repository';

interface ParamsProps {
    id: string;
}
export class FindClassService {
    async execute(params: ParamsProps) {
        const { id } = params;

        const classToFind = await classRepository.findOne({
            where: { id: Number(id) },
        });

        if (!classToFind) {
            throw new ApiError('Classe não encontrada', 404);
        }

        return classToFind;
    }
}
