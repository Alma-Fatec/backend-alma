"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const ensuredAuthenticated_1 = require("../middlewares/ensuredAuthenticated");
const router = express_1.default.Router();
const controller = new user_controller_1.default();
router.post('/', async (req, res) => {
    const response = await controller.create(req.body);
    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }
    return res.status(201).send(response);
});
router.get('/', (0, ensuredAuthenticated_1.ensuredAuthenticated)(), async (req, res) => {
    const response = await controller.getUsers();
    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }
    return res.status(200).json({ response });
});
exports.default = router;
