import { BaseEntity } from './BaseEntity';

type UserProps = {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
    is_active: boolean;
};

export class User extends BaseEntity<UserProps> {
    private constructor(props: UserProps, id?: string) {
        super(props, id);
    }

    public create(props: UserProps, id?: string) {
        const user = new User(props, id);

        return user;
    }
}
