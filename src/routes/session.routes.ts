import express from 'express';
import { SessionController } from '../controllers/session.controller';

const router = express.Router();

const controller = new SessionController();

router.post('/login', async (req, res) => {
    const response = await controller.handle(req.body);

    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }

    return res.status(201).send(response);
});

// router.get('/', ensuredAuthenticated(), async (req, res) => {
//     const response = await controller.getUsers();

//     if (response instanceof Error) {
//         return res.status(400).json({ error: response.message });
//     }

//     return res.status(200).json({ response });
// });

export default router;
