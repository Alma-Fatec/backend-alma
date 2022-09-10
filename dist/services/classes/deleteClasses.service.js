"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClassesService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class DeleteClassesService {
    constructor() {
        this.prisma = prisma_1.default;
    }
    async execute(id) {
        const block = await this.prisma.classes.delete({
            where: { id },
        });
        return block;
    }
}
exports.DeleteClassesService = DeleteClassesService;
