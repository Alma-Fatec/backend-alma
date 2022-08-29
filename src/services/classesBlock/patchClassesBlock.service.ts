import { ClassesBlock, Users } from '@prisma/client';
import prisma from '../prisma';

export class PatchClassesBlockService {
    protected prisma = prisma;

    async execute(
        id: number,
        data: ClassesBlock,
    ): Promise<ClassesBlock | Error> {

        const updatedBlock = await this.prisma.classesBlock.update({
            where: { id: id },
            data,
        });

        return updatedBlock;
    }
}
