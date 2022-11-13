import { classRepository } from '../../repositories/class.repository';

interface ParamsProps {
    page: number;
    limit: number;
    blockId?: string;
}
export class ListClassesService {
    async execute(params: ParamsProps) {
        const where = params.blockId
            ? {
                  block: { id: params.blockId },
              }
            : {};

        const classes = await classRepository.find({
            skip: (params.page - 1) * params.limit,
            take: params.limit,
            where: where,
            order: {
                order: 'ASC',
            },
        });

        return {
            page: params.page,
            limit: params.limit,
            data: classes,
        };
    }
}
