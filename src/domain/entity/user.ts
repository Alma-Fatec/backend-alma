import { BaseEntity } from './BaseEntity';
import { Roles } from './Roles';

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

    static create(parameters: UserProps, id: string): User {
        return new User(parameters, id);
    }
}
