"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListClassesBlockService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ListClassesBlockService {
    constructor() {
        this.prisma = prisma_1.default;
    }
    async execute() {
        const block = await this.prisma.classesBlock.findMany();
        return block;
    }
}
exports.ListClassesBlockService = ListClassesBlockService;
