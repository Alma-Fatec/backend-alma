"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesBlockSchema = void 0;
const yup_1 = require("yup");
exports.classesBlockSchema = (0, yup_1.object)().shape({
    body: (0, yup_1.object)({
        description: (0, yup_1.string)().min(1).max(240),
        cover: (0, yup_1.string)(),
    }),
});
