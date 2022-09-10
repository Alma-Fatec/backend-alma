"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchClassesBlockService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class PatchClassesBlockService {
    constructor() {
        this.prisma = prisma_1.default;
    }
    async execute(id, data) {
        const updatedBlock = await this.prisma.classesBlock.update({
            where: { id: id },
            data,
        });
        return updatedBlock;
    }
}
exports.PatchClassesBlockService = PatchClassesBlockService;
