import { Class } from '../../entities/class';
import { ApiError } from '../../middlewares/error';
import { blockRepository } from '../../repositories/block.repository';
import { classRepository } from '../../repositories/class.repository';

export class CreateClassesService {
    async execute(classes: Class) {
        const block = await blockRepository.findOne({
            // @ts-ignore
            where: { id: classes.block[0] },
        });

        if (!block) {
            throw new ApiError('Block not found', 400);
        }

        const maxOrder = await classRepository.query(
            'SELECT MAX("order") FROM class WHERE "blockId" = $1',
            [block.id],
        );

        console.log(block.id);

        const newClass = classRepository.create({
            name: classes.name,
            description: classes.description,
            order: maxOrder[0].max + 1,
            cover: classes.cover ?? '',
            // add block to class
            //@ts-ignore
            block: block,
        });

        await classRepository.save(newClass);

        return newClass;
    }
}
