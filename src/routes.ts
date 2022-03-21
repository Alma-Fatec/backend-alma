import { Router } from 'express';
import { RoleController } from './controllers/RoleController';
import { SessionController } from './controllers/SessionController';
import { UserController } from './controllers/UserController';
import { ensuredAuthenticated } from './middlewares/ensuredAuthenticated';
import validate from './middlewares/validate';
import { userSchema } from './validators/user';

const routes = Router();

routes.post('/login', new SessionController().handle);

routes.post('/user', validate(userSchema), new UserController().create);
routes.get('/user', ensuredAuthenticated(), new UserController().index);

routes.post('/roles', new RoleController().create);

export default routes;
