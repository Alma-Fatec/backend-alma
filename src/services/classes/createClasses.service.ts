import { Class } from '../../entities/class';
import { classRepository } from '../../repositories/class.repository';

export class CreateClassesService {
    async execute(classes: Class) {
        const maxOrder = await classRepository.query(
            'SELECT MAX("order") FROM class',
        );

        const newClass = classRepository.create({
            ...classes,
            order: maxOrder[0].max + 1,
        });

        await classRepository.save(newClass);

        return newClass;
    }
}
