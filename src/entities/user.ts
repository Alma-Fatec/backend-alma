import { ValidationError } from 'yup';
import { userSchema } from '../validators/user';
import { BaseEntity } from './baseEntity';
import { Roles } from './roles';

type UserProps = {
    name: string;
    socialName: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
    isActive: boolean;
    role: Roles;
};

export class User extends BaseEntity<UserProps> {
    private constructor(parameters: UserProps, id: string) {
        const user = userSchema.validateSync(parameters);

        super(parameters, id);
    }

    static async create(parameters: UserProps, id?: string) {
        const user = await userSchema.validate(parameters);

        console.log(user);

        if (user instanceof ValidationError) {
            throw new Error('Invalid user');
        }

        new User(parameters, id as string);
    }
}
