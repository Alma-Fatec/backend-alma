"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionService = void 0;
class RolePermissionService {
    async create({ roleId, permissions, }) {
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
exports.RolePermissionService = RolePermissionService;
