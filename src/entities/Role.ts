import { BaseEntity } from './BaseEntity';

type RoleProps = {
    name: string;
    description: string;
};

export class Role extends BaseEntity<RoleProps> {
    private constructor(props: RoleProps, id?: string) {
        super(props, id);
    }

    public create(props: RoleProps, id?: string) {
        const role = new Role(props, id);

        return role;
    }
}
