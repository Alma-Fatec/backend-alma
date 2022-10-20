"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ping_controller_1 = __importDefault(require("../controllers/ping.controller"));
const user_routes_1 = __importDefault(require("./user.routes"));
const session_routes_1 = __importDefault(require("./session.routes"));
const block_routes_1 = __importDefault(require("./block.routes"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({ message: 'Seja bem viao à API!' });
});
router.get('/ping', async (_req, res) => {
    const controller = new ping_controller_1.default();
    const response = await controller.getMessage();
    return res.send(response);
});
router.use('/users', user_routes_1.default);
router.use('/session', session_routes_1.default);
router.use('/classesBlock', block_routes_1.default);
exports.default = router;
