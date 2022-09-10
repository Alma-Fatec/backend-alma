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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const createUser_service_1 = require("../services/user/createUser.service");
const listUser_service_1 = require("../services/user/listUser.service");
let UserController = class UserController {
    async create(body) {
        const { name, social_name, cpf, phone, email, password } = body;
        const createUserService = new createUser_service_1.CreateUserService();
        const result = await createUserService.execute({
            name,
            social_name,
            cpf,
            phone,
            email,
            password,
            classesBlockId: null,
        });
        return result;
    }
    async getUsers() {
        const listUserService = new listUser_service_1.ListUserService();
        const result = await listUserService.execute();
        return result;
    }
};
__decorate([
    (0, tsoa_1.Post)('/'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
UserController = __decorate([
    (0, tsoa_1.Route)('users'),
    (0, tsoa_1.Tags)('User')
], UserController);
exports.default = UserController;
