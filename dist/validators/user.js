"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const yup_1 = require("yup");
exports.userSchema = (0, yup_1.object)({
    name: (0, yup_1.string)().min(1).max(255),
    social_name: (0, yup_1.string)(),
    cpf: (0, yup_1.string)().min(14).max(14).required('CPF é um campo obrigatório'),
    phone: (0, yup_1.string)().min(8).max(255),
    email: (0, yup_1.string)().email().required('Email é um campo obrigatório'),
    password: (0, yup_1.string)(),
});
