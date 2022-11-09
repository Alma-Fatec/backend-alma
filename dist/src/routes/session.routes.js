"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session_controller_1 = require("../controllers/session.controller");
const router = express_1.default.Router();
const controller = new session_controller_1.SessionController();
router.post('/login', controller.login);
router.post('/refresh', controller.refresh);
exports.default = router;
