import { Router } from 'express';
import AssignmentsController from '../controllers/assignment.controller';
import uploadService from '../infra/upload';
import { checkPermissions } from '../middlewares/permissions';

const router = Router();
const controller = new AssignmentsController();

router.get('/', controller.getAssignments);
router.get('/:id', controller.getAssignment);

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
    controller.patchAssignments,
);

router.delete(
    '/:id',
    //checkPermissions(['Admin', 'Teacher']),
    controller.deleteAssignments,
);

export default router;
