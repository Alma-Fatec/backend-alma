import { Router } from 'express';
import PingController from '../controllers/ping.controller';
import UserRouter from './user.routes';
import SessionRouter from './session.routes';
import ClassesBlockRouter from './block.routes';
import { ensuredAuthenticated } from '../middlewares/ensuredAuthenticated';
import { checkPermissions } from '../middlewares/permissions';

const router = Router();

router.get('/', (_req, res) => {
    res.json({ message: 'olá mundo! :D', timestamp: new Date() });
});

router.get('/ping', async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.use('/users', UserRouter);
router.use('/session', SessionRouter);
router.use('/classesBlock', ensuredAuthenticated(), ClassesBlockRouter);

export default router;
