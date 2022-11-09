"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClassesBlockService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class DeleteClassesBlockService {
    constructor() {
        this.prisma = prisma_1.default;
    }
    async execute(id) {
        const block = await this.prisma.classesBlock.delete({
            where: { id },
        });
        return block;
    }
}
exports.DeleteClassesBlockService = DeleteClassesBlockService;
