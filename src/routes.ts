import { Router } from 'express';
import { RoleController } from './controllers/RoleController';
import { UserController } from './controllers/UserController';
import validate from './middlewares/validate';
import { userSchema } from './validators/user';

const routes = Router();

routes.post('/user', validate(userSchema), new UserController().create);

routes.post('/roles', new RoleController().create);

export default routes;
