"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const yup_1 = require("yup");
const error_1 = require("../../middlewares/error");
const user_repository_1 = require("../../repositories/user.repository");
const user_1 = require("../../validators/user");
class CreateUserService {
    // @ts-ignore
    async execute(body) {
        try {
            user_1.userSchema.validateSync(body);
        }
        catch (error) {
            console.log(error);
            if (error instanceof yup_1.ValidationError) {
                throw new error_1.ApiError(error.errors.join(' '), 400);
            }
        }
        const emailAlreadyExists = await user_repository_1.userRepository.findOne({
            where: { email: body.email },
        });
        if (emailAlreadyExists) {
            throw new error_1.ApiError('Esse email já está em uso', 400);
        }
        const cpfAlreadyExists = await user_repository_1.userRepository.findOne({
            where: { cpf: String(body.cpf) },
        });
        if (cpfAlreadyExists) {
            throw new error_1.ApiError('Esse cpf já foi cadastrado', 400);
        }
        const passwordHash = await (0, bcryptjs_1.hash)(body.password, 8);
        const user = await user_repository_1.userRepository.create(Object.assign(Object.assign({}, body), { cpf: String(body.cpf), password: passwordHash, isActive: true, role: 'Student' }));
        const savedUser = await user_repository_1.userRepository.save(user);
        // @ts-ignore
        delete savedUser.password;
        return savedUser;
    }
}
exports.CreateUserService = CreateUserService;
