"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const ensuredAuthenticated_1 = require("../middlewares/ensuredAuthenticated");
const permissions_1 = require("../middlewares/permissions");
const router = express_1.default.Router();
const controller = new user_controller_1.default();
router.post('/', new user_controller_1.default().create);
router.get('/', (0, ensuredAuthenticated_1.ensuredAuthenticated)(), controller.getUsers);
router.get('/:id', (0, ensuredAuthenticated_1.ensuredAuthenticated)(), controller.getUser);
router.patch('/:id', (0, ensuredAuthenticated_1.ensuredAuthenticated)(), (0, permissions_1.checkPermissions)(['Admin']), controller.promoteUser);
exports.default = router;
