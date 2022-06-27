import express from 'express';
import UserController from '../controllers/user.controller';
import { ensuredAuthenticated } from '../middlewares/ensuredAuthenticated';
import validate from '../middlewares/validate';
import { userSchema } from '../validators/user';

const router = express.Router();

const controller = new UserController();

router.post('/', validate(userSchema), async (req, res) => {
    const response = await controller.create(req.body);

    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }

    return res.status(201).send(response);
});
router.get('/', ensuredAuthenticated(), async (req, res) => {
    const response = await controller.getUsers();

    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }

    return res.status(200).json({ response });
});

export default router;
