import { Classes } from '@prisma/client';
import prisma from '../prisma';

export class CreateClassesService {
    protected prisma = prisma;

    async execute(classes: Classes): Promise<Classes | Error> {
        const block = await this.prisma.classes.create({
            data: {
                ...classes,
            },
        });

        return block;
    }
}
