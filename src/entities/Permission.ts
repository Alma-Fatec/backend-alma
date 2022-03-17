import { BaseEntity } from './BaseEntity';

type PermissionProps = {
    name: string;
    description: string;
};

export class Permission extends BaseEntity<PermissionProps> {
    private constructor(props: PermissionProps, id?: string) {
        super(props, id);
    }

    public create(props: PermissionProps, id?: string) {
        const permission = new Permission(props, id);

        return permission;
    }
}
