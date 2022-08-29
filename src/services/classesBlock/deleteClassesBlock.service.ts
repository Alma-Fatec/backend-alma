import { ClassesBlock, Users } from '@prisma/client';
import prisma from '../prisma';

export class DeleteClassesBlockService {
    protected prisma = prisma;

    async execute(id: number): Promise<ClassesBlock | Error> {
        const block = await this.prisma.classesBlock.delete({
            where: { id },
        });

        return block;
    }
}
