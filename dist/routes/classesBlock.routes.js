"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const classesBlock_controller_1 = __importDefault(require("../controllers/classesBlock.controller"));
const upload_1 = __importDefault(require("../services/upload"));
const router = express_1.default.Router();
const controller = new classesBlock_controller_1.default();
router.get('/', async (req, res) => {
    const response = await controller.getBlocks();
    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }
    return res.status(200).send(response);
});
router.post('/', upload_1.default.single('cover'), async (req, res) => {
    //@ts-ignore
    const response = await controller.create(req);
    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }
    return res.status(201).send(response);
});
router.patch('/:id', async (req, res) => {
    const response = await controller.pathBlocks(Number(req.params.id), req.body);
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
exports.default = router;
