// create a router for the controller and export it with the prefix /options

import { Router } from 'express';
import OptionsController from '../controllers/options.controller';

const router = Router();

router.get('/', OptionsController.list);
router.get('/:id', OptionsController.find);
router.post('/', OptionsController.create);
router.patch('/', OptionsController.update);
router.delete('/:id', OptionsController.delete);

export default router;
