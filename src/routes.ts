import { Router } from 'express';
import { Auth } from './modules/auth/authController';

const apiRouter = Router();
const authController = new Auth();

apiRouter.route('/v1/auth').get(authController.handle);

export default apiRouter;
