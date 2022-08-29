import { Classes, Users } from '@prisma/client';
import prisma from '../prisma';

export class ListClassesService {
    protected prisma = prisma;

    async execute(): Promise<Classes[] | Error> {
        const block = await this.prisma.classes.findMany();

        return block;
    }
}
