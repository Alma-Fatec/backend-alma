"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const error_1 = require("../middlewares/error");
const user_repository_1 = require("../repositories/user.repository");
const createUser_service_1 = require("../services/user/createUser.service");
const roles = ['Admin', 'Student', 'Teacher'];
const createUserService = new createUser_service_1.CreateUserService();
let UserController = class UserController {
    constructor() {
        this.userTable = user_repository_1.userRepository;
    }
    async create(req, res) {
        const { body } = req;
        const result = await createUserService.execute(body);
        return res.status(201).json(result);
    }
    async getUsers(req, res) {
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;
        const users = await user_repository_1.userRepository.find({
            take: limit,
            skip: limit * (page - 1),
        });
        return res.json({
            page,
            limit,
            users,
        });
    }
    async getUser(req, res) {
        const { id } = req.params;
        const user = await user_repository_1.userRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new error_1.ApiError('Usuário não encontrado', 404);
        }
        return res.json(user);
    }
    async promoteUser(req, res) {
        const { id } = req.params;
        const { role } = req.body;
        const user = await user_repository_1.userRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new error_1.ApiError('Usuário não encontrado', 404);
        }
        if (!roles.includes(role.trim())) {
            throw new error_1.ApiError('Role inválida', 400);
        }
        await user_repository_1.userRepository.update(user.id, {
            role: req.body.role,
        });
        return res.json(Object.assign(Object.assign({}, user), { role }));
    }
};
__decorate([
    (0, tsoa_1.Post)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, tsoa_1.Get)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, tsoa_1.Patch)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "promoteUser", null);
UserController = __decorate([
    (0, tsoa_1.Route)('users'),
    (0, tsoa_1.Tags)('User')
], UserController);
exports.default = UserController;
