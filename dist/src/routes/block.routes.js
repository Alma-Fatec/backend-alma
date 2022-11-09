"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classesBlock_controller_1 = __importDefault(require("../controllers/classesBlock.controller"));
const upload_1 = __importDefault(require("../infra/upload"));
const permissions_1 = require("../middlewares/permissions");
const router = (0, express_1.Router)();
const controller = new classesBlock_controller_1.default();
router.get('/', controller.getBlocks);
router.get('/:id', controller.getBlock);
router.post('/', (0, permissions_1.checkPermissions)(['Admin', 'Teacher']), upload_1.default.single('cover'), controller.create);
router.patch('/:id', (0, permissions_1.checkPermissions)(['Admin', 'Teacher']), upload_1.default.single('cover'), controller.pathBlocks);
router.delete('/:id', (0, permissions_1.checkPermissions)(['Admin', 'Teacher']), controller.removeBlock);
exports.default = router;
