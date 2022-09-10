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
        super(parameters, id);
    }

    static async create(parameters: UserProps, id?: string) {
        return new User(parameters, id as string);
    }
}
