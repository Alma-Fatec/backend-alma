import { ApiError } from '../../middlewares/error';
import { blockRepository } from '../../repositories/block.repository';

export class DeleteClassesBlockService {
    async execute(id: string) {
        const block = await blockRepository.findOne({
            where: { id },
        });

        if (!block) {
            throw new ApiError('Esse bloco não existe.', 400);
        }

        await blockRepository
            .createQueryBuilder()
            .delete()
            .from('block')
            .where('id = :id', { id })
            .execute();

        return block;
    }
}
