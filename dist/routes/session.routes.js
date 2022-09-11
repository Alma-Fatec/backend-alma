"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session_controller_1 = require("../controllers/session.controller");
const router = express_1.default.Router();
const controller = new session_controller_1.SessionController();
router.post('/login', async (req, res) => {
    const response = await controller.handle(req.body);
    if (response instanceof Error) {
        return res.status(400).json({ error: response.message });
    }
    return res.status(201).send(response);
});
// router.get('/', ensuredAuthenticated(), async (req, res) => {
//     const response = await controller.getUsers();
//     if (response instanceof Error) {
//         return res.status(400).json({ error: response.message });
//     }
//     return res.status(200).json({ response });
// });
exports.default = router;
