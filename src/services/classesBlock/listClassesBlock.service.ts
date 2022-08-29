import { ClassesBlock, Users } from '@prisma/client';
import prisma from '../prisma';

export class ListClassesBlockService {
    protected prisma = prisma;

    async execute(): Promise<ClassesBlock[] | Error> {
        const block = await this.prisma.classesBlock.findMany();

        return block;
    }
}
