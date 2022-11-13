import { Class } from '../../entities/class';
import { ApiError } from '../../middlewares/error';
import { classRepository } from '../../repositories/class.repository';

interface ParamsProps {
    id: string;
    body: Class;
    file?: Express.Multer.File;
}
export class UpdateClassesService {
    async execute(params: ParamsProps) {
        const { id, body, file } = params;

        const classToUpdate = await classRepository.findOne({
            where: { id: Number(id) },
        });

        if (!classToUpdate) {
            throw new ApiError('Classe não encontrada', 404);
        }

        const classUpdated = await classRepository.save({
            ...classToUpdate,
            ...body,
            // @ts-ignore
            cover: file?.location ?? classToUpdate.cover,
        });

        return classUpdated;
    }
}
