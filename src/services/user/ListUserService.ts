import { PrismaClient, Users } from '@prisma/client';

export class ListUserService {
    protected prisma = new PrismaClient();

    async execute() {
        const users = await this.prisma.users.findMany({
            select: {
                id: true,
                name: true,
                social_name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                is_active: true,
            }
        });

        return users;
    }
}
