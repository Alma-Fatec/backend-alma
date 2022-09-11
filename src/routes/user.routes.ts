import express from 'express';
import UserController from '../controllers/user.controller';
import { ensuredAuthenticated } from '../middlewares/ensuredAuthenticated';
import { errorMiddleware } from '../middlewares/error';

const router = express.Router();

const controller = new UserController();

router.post('/', new UserController().create);

router.get('/', ensuredAuthenticated(), async (req, res) => {
    const response = await controller.getUsers();

    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }

    return res.status(200).json({ response });
});

//router.use(errorMiddleware);

export default router;
