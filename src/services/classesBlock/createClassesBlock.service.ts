import { ClassesBlock, Users } from '@prisma/client';
import prisma from '../prisma';

export class CreateClassesBlockService {
    protected prisma = prisma;

    async execute(classesBlock: ClassesBlock): Promise<ClassesBlock | Error> {
        const block = await this.prisma.classesBlock.create({
            data: {
                ...classesBlock,
            },
        });

        return block;
    }
}
