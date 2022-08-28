import express from 'express';
import ClassesBlockController from '../controllers/classesBlock.controller';
import { ensuredAuthenticated } from '../middlewares/ensuredAuthenticated';


const router = express.Router();
const controller = new ClassesBlockController();

router.post('/', async (req, res) => {
    const response = await controller.create(req.body);

    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }

    return res.status(201).send(response);

});
export default router;
