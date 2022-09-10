import express from 'express';
import ClassesController from '../controllers/classes.controller';
import uploadService from '../services/upload';

const router = express.Router();
const controller = new ClassesController();

router.get('/', async (req, res) => {
    const response = await controller.getClasses();

    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }

    return res.status(200).send(response);
});

router.post('/', uploadService.single('cover'), async (req, res) => {
    const response = await controller.create(req.body);

    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }

    return res.status(201).send(response);
});

router.patch('/:id', async (req, res) => {
    const response = await controller.patchClasses(
        Number(req.params.id),
        req.body,
    );

    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }

    return res.status(200).send(response);
});

router.delete('/:id', async (req, res) => {
    const response = await controller.removeClasses(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }

    return res.status(200).send(response);
});

export default router;
