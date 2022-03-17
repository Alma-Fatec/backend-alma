import { Router } from 'express';
import { RoleController } from './controllers/RoleController';

const routes = Router();

routes.post('/roles', new RoleController().create);

export default routes;
