import express from 'express';
import { SessionController } from '../controllers/session.controller';

const router = express.Router();

const controller = new SessionController();

router.post('/login', controller.login);
router.post('/refresh', controller.refresh);

export default router;
