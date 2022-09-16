import { Users } from '@prisma/client';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { ApiError } from '../../middlewares/error';
import { userRepository } from '../../repositories/user.repository';

/** @deprecated */
export class CreateUserService {
    // @ts-ignore
    public async execute(body) {}
}
