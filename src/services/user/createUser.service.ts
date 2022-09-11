import { Users } from '@prisma/client';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { ApiError } from '../../middlewares/error';
import { userRepository } from '../../repositories/user.repository';

export class CreateUserService {

    public async execute(body) {
        
    }
}
