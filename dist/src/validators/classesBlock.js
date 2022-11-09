"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesBlockSchema = void 0;
const yup_1 = require("yup");
exports.classesBlockSchema = (0, yup_1.object)({
    title: (0, yup_1.string)().min(1).max(50).required('Título é um campo obrigatório'),
    description: (0, yup_1.string)().min(1).max(240),
    cover: (0, yup_1.string)().nullable(),
});
