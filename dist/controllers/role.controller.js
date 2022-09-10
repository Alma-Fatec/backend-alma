"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const CreateRoleService_1 = require("../services/roles/CreateRoleService");
class RoleController {
    async create(request, response) {
        const { name, description } = request.body;
        const createRoleService = new CreateRoleService_1.CreateRoleService();
        const result = await createRoleService.execute({ name, description });
        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }
        return response.json(result);
    }
}
exports.RoleController = RoleController;
