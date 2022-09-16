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
exports.SessionController = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const tsoa_1 = require("tsoa");
const error_1 = require("../middlewares/error");
const user_repository_1 = require("../repositories/user.repository");
let SessionController = class SessionController {
    async login(req, res) {
        const { email, password } = req.body;
        const user = await user_repository_1.userRepository.findOne({
            select: ['id', 'name', 'email', 'password', 'socialName', 'phone'],
            where: { email },
        });
        if (!user) {
            throw new error_1.ApiError('Esse usuário não existe.', 400);
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(password, user.password);
        if (!passwordMatch) {
            throw new error_1.ApiError('Usuário ou senha incorretos.', 400);
        }
        const token = (0, jsonwebtoken_1.sign)({}, String(process.env.APP_SECRET), {
            subject: user.id,
            expiresIn: '7h',
        });
        //@ts-ignore
        delete user.password;
        return res.status(201).json({ token, user });
    }
    async refresh(req, res) {
        const { user_id } = req.body;
        const user = await user_repository_1.userRepository.findOne({
            where: { id: user_id },
        });
        if (!user) {
            throw new error_1.ApiError('Esse usuário não existe.', 400);
        }
        const refreshToken = (0, jsonwebtoken_1.sign)({}, String(process.env.APP_SECRET), {
            subject: user.id,
            expiresIn: '7h',
        });
        return res.status(201).json({ token: refreshToken });
    }
};
__decorate([
    (0, tsoa_1.Post)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "login", null);
__decorate([
    (0, tsoa_1.Post)('/refresh'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "refresh", null);
SessionController = __decorate([
    (0, tsoa_1.Route)('session'),
    (0, tsoa_1.Tags)('Session')
], SessionController);
exports.SessionController = SessionController;
