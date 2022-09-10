import { Router } from 'express';
import PingController from '../controllers/ping.controller';
import UserRouter from './user.routes';
import SessionRouter from './session.routes';
import ClassesBlockRouter from './classesBlock.routes';

const router = Router();

router.get('/', (_req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

router.get('/ping', async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.use('/users', UserRouter);
router.use('/session', SessionRouter);
router.use('/classesBlock', ClassesBlockRouter);

//router.post('/login', new SessionController().handle);

// router.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html');
// });

// router.post('/roles', new RoleController().create);

export default router;
