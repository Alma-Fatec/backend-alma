import { hash } from 'bcryptjs';
import { ValidationError } from 'yup';
import { User } from '../../entities/user';
import { ApiError } from '../../middlewares/error';
import { userRepository } from '../../repositories/user.repository';
import { userSchema } from '../../validators/user';

export class CreateUserService {
    // @ts-ignore
    public async execute(body: User) {
        try {
            userSchema.validateSync(body);
        } catch (error) {

            if (error instanceof ValidationError) {
                throw new ApiError(error.errors.join(' '), 400);
            }
        }

        const emailAlreadyExists = await userRepository.findOne({
            where: { email: body.email },
        });

        if (emailAlreadyExists) {
            throw new ApiError('Esse email já está em uso', 400);
        }

        const cpfAlreadyExists = await userRepository.findOne({
            where: { cpf: String(body.cpf) },
        });

        if (cpfAlreadyExists) {
            throw new ApiError('Esse cpf já foi cadastrado', 400);
        }

        const passwordHash = await hash(body.password, 8);

        // @ts-ignore
        delete body.id;

        const user = await userRepository.create({
            ...body,
            cpf: String(body.cpf),
            password: passwordHash,
            isActive: true,
            role: 'Student',
        });

        const savedUser = await userRepository.save(user);

        // @ts-ignore
        delete savedUser.password;

        return savedUser;
    }
}
