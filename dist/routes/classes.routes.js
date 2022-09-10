"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const classes_controller_1 = __importDefault(require("../controllers/classes.controller"));
const upload_1 = __importDefault(require("../services/upload"));
const router = express_1.default.Router();
const controller = new classes_controller_1.default();
router.get('/', async (req, res) => {
    const response = await controller.getClasses();
    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }
    return res.status(200).send(response);
});
router.post('/', upload_1.default.single('cover'), async (req, res) => {
    const response = await controller.create(req.body);
    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }
    return res.status(201).send(response);
});
router.patch('/:id', async (req, res) => {
    const response = await controller.patchClasses(Number(req.params.id), req.body);
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
exports.default = router;
