import { PrismaClient, Users } from '@prisma/client';

export class ListUserService {
    protected prisma = new PrismaClient();

    async execute(): Promise<Users[]> {
        const users = await this.prisma.users.findMany();
        return users;
    }
}
