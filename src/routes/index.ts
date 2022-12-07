import { Router } from 'express';
import PingController from '../controllers/ping.controller';
import { ensuredAuthenticated } from '../middlewares/ensuredAuthenticated';
import ClassesBlockRouter from './block.routes';
import ClassesRouter from './classes.routes';
import SessionRouter from './session.routes';
import UserRouter from './user.routes';
import AssignmentRouter from './assignment.routes';

const router = Router();

const filePath = 'public/index.html';

router.get('/', (_req, res) => {
    res.sendFile(filePath);
});

router.get('/ping', async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.use('/users', UserRouter);
router.use('/session', SessionRouter);
router.use('/classesBlock', ensuredAuthenticated(), ClassesBlockRouter);
router.use('/classes', ensuredAuthenticated(), ClassesRouter);
router.use('/assignments', ensuredAuthenticated(), AssignmentRouter);

export default router;
