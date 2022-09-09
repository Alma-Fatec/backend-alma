import { Classes, Users } from '@prisma/client';
import prisma from '../prisma';

export class DeleteClassesService {
    protected prisma = prisma;

    async execute(id: number): Promise<Classes | Error> {
        const block = await this.prisma.classes.delete({
            where: { id },
        });

        return block;
    }
}
