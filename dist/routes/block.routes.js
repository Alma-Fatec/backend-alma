"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classesBlock_controller_1 = __importDefault(require("../controllers/classesBlock.controller"));
const upload_1 = __importDefault(require("../services/upload"));
const router = (0, express_1.Router)();
const controller = new classesBlock_controller_1.default();
router.get('/', controller.getBlocks);
router.post('/', upload_1.default.single('cover'), controller.create);
router.patch('/:id', upload_1.default.single('cover'), controller.pathBlocks);
router.delete('/:id', controller.removeBlock);
exports.default = router;
