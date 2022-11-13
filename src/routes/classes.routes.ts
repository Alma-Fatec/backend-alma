import express from 'express';
import ClassesController from '../controllers/classes.controller';
import uploadService from '../infra/upload';

const router = express.Router();
const controller = new ClassesController();

router.get('/', controller.getClasses);
router.get('/:id', controller.getClass);

router.post('/', uploadService.single('cover'), controller.create);

router.patch('/:id', uploadService.single('cover'), controller.patchClasses);

router.delete('/:id', controller.deleteClasses);
export default router;
