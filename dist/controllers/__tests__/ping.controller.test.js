"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ping_controller_1 = __importDefault(require("../ping.controller"));
test.skip('should return pong message', async () => {
    const controller = new ping_controller_1.default();
    const response = await controller.getMessage();
    expect(response.message).toBe('pong');
});
