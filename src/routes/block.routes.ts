import { Router } from 'express';
import ClassesBlockController from '../controllers/classesBlock.controller';
import uploadService from '../infra/upload';
import { checkPermissions } from '../middlewares/permissions';

const router = Router();
const controller = new ClassesBlockController();

router.get('/', controller.getBlocks);
router.get('/:id', controller.getBlock);

router.post(
    '/',
    //checkPermissions(['Admin', 'Teacher']),
    uploadService.single('cover'),
    controller.create,
);

router.patch(
    '/:id',
    //checkPermissions(['Admin', 'Teacher']),
    uploadService.single('cover'),
    controller.pathBlocks,
);

router.delete(
    '/:id',
    checkPermissions(['Admin', 'Teacher']),
    controller.removeBlock,
);

export default router;
