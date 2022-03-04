import { Router } from 'express';

const authRouter = Router();

authRouter.get('/', async (req, res) => {
    return res.json({ message: 'sask' });
});

export default authRouter;
