"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClassesBlockService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class CreateClassesBlockService {
    constructor() {
        this.prisma = prisma_1.default;
    }
    async execute(classesBlock) {
        const block = await this.prisma.classesBlock.create({
            data: Object.assign({}, classesBlock),
        });
        return block;
    }
}
exports.CreateClassesBlockService = CreateClassesBlockService;
