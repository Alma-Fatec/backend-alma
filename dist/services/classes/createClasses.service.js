"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClassesService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class CreateClassesService {
    constructor() {
        this.prisma = prisma_1.default;
    }
    async execute(classes) {
        const block = await this.prisma.classes.create({
            data: Object.assign({}, classes),
        });
        return block;
    }
}
exports.CreateClassesService = CreateClassesService;
