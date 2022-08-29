import { Users } from '@prisma/client';
import prisma from '../prisma';

export class ListUserService {
    protected prisma = prisma;

    async execute(): Promise<Users[]> {
        const users = await this.prisma.users.findMany({
            select: { password: false },
        });

        return users as Users[];
    }
}
