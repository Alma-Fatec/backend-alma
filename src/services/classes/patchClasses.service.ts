import { Classes, Users } from '@prisma/client';
import prisma from '../prisma';

export class PatchClassesService {
    protected prisma = prisma;

    async execute(
        id: number,
        data: Classes,
    ): Promise<Classes | Error> {

        const updatedBlock = await this.prisma.classes.update({
            where: { id: id },
            data,
        });

        return updatedBlock;
    }
}
