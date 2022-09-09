import express from 'express';
import ClassesBlockController from '../controllers/classesBlock.controller';
import { ensuredAuthenticated } from '../middlewares/ensuredAuthenticated';
import validate from '../middlewares/validate';
import uploadService from '../services/upload';
import { classesBlockSchema } from '../validators/classesBlock';

const router = express.Router();
const controller = new ClassesBlockController();

router.get('/', async (req, res) => {
    const response = await controller.getBlocks();

    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }

    return res.status(200).send(response);
});

router.post(
    '/',
    validate(classesBlockSchema),
    uploadService.single('cover'),
    async (req, res) => {
        //@ts-ignore
        const response = await controller.create(req);

        if (response instanceof Error) {
            return res.status(400).json({ error: response.message });
        }

        return res.status(201).send(response);
    },
);

router.patch('/:id', async (req, res) => {
    const response = await controller.pathBlocks(
        Number(req.params.id),
        req.body,
    );

    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }

    return res.status(200).send(response);
});

router.delete('/:id', async (req, res) => {
    const response = await controller.removeBlock(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }

    return res.status(200).send(response);
});

export default router;
