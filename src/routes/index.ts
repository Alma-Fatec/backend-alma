import { Router } from 'express';
import PingController from '../controllers/ping.controller';
import UserRouter from './user.routes';
import SessionRouter from './session.routes';
import path from 'path';

const router = Router();

router.get('/', (_req, res) => {
    res.sendFile(path.resolve('src/views/index.html'));
});

router.get('/ping', async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.use('/users', UserRouter);
router.use('/session', SessionRouter);

//router.post('/login', new SessionController().handle);

// router.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html');
// });

// router.post('/roles', new RoleController().create);

export default router;
