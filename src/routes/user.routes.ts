import express from 'express';
import UserController from '../controllers/user.controller';
import { ensuredAuthenticated } from '../middlewares/ensuredAuthenticated';
import { checkPermissions } from '../middlewares/permissions';

const router = express.Router();

const controller = new UserController();

router.post('/', new UserController().create);
router.get('/', ensuredAuthenticated(), controller.getUsers);
router.get('/:id', ensuredAuthenticated(), controller.getUser);

router.patch(
    '/:id',
    ensuredAuthenticated(),
    checkPermissions(['Admin']),
    controller.promoteUser,
);

export default router;
