"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ListUserService {
    constructor() {
        this.prisma = prisma_1.default;
    }
    async execute() {
        const users = await this.prisma.users.findMany({
            select: { password: false },
        });
        return users;
    }
}
exports.ListUserService = ListUserService;
