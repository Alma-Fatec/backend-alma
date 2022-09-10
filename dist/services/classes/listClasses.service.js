"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListClassesService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ListClassesService {
    constructor() {
        this.prisma = prisma_1.default;
    }
    async execute() {
        const block = await this.prisma.classes.findMany();
        return block;
    }
}
exports.ListClassesService = ListClassesService;
