type RolePermissionRequest = {
    roleId: string;
    permissions: string[];
};

export class RolePermissionService {
    async create({
        roleId,
        permissions,
    }: RolePermissionRequest): Promise<any | Error> {
        // const repo = RoleRepository();

        // const role = await repo.findOne(roleId);

        // if (!role) {
        //     return new Error('Role does not exists!');
        // }

        // const permissionsExists = await PermissionRepository().findByIds(
        //     permissions,
        // );

        // role.permissions = permissionsExists;

        // await repo.save(role);

        return new Error('Not Implemented!');
    }
}
