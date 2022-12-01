import { Like } from 'typeorm';
import { ApiError } from '../../middlewares/error';
import { classRepository } from '../../repositories/class.repository';

interface ParamsProps {
    page: number;
    limit: number;
    blockId?: string;
}
export class ListClassesService {
    async execute(params: ParamsProps) {
        if (params.blockId && params.blockId.length < 10) {
            throw new ApiError('BlockId inválido', 400);
        }

        const where = {
            ...(params.blockId && { block: { id: params.blockId } }),
        };

        const classes = await classRepository.find({
            where: where,
            skip: (params.page - 1) * params.limit,
            take: params.limit,
            order: {
                order: 'ASC',
            },
            // select block.id from block relation
            relations: ['block'],
        });

        return {
            page: params.page,
            limit: params.limit,
            data: classes,
        };
    }
}
