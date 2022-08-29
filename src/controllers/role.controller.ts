import { Request, Response } from 'express';
import { CreateRoleService } from '../services/roles/CreateRoleService';

export class RoleController {
    async create(request: Request, response: Response) {
        const { name, description } = request.body;

        const createRoleService = new CreateRoleService();

        const result = await createRoleService.execute({ name, description });

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }

        return response.json(result);
    }
}
