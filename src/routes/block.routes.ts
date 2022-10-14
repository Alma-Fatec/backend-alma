import { Router } from 'express';
import ClassesBlockController from '../controllers/classesBlock.controller';
import uploadService from '../infra/upload';

const router = Router();
const controller = new ClassesBlockController();

router.get('/', controller.getBlocks);

router.post('/', uploadService.single('cover'), controller.create);

router.patch('/:id', uploadService.single('cover'), controller.pathBlocks);

router.delete('/:id', controller.removeBlock);

export default router;
