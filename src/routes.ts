import { Router } from 'express';
import authRouter from './controller/auth/authController';

const apiRouter = Router();

apiRouter.use('/v1', authRouter);

export default apiRouter;
