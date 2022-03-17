import { PrismaClient } from '@prisma/client';

type RoleRequest = {
    name: string;
    description: string;
};

export class CreateRoleService {
    async execute({ name, description }: RoleRequest): Promise<any | Error> {
        return new Error('Not Implemented');
    }
}
