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
const typeorm_1 = require("typeorm");
const yup_1 = require("yup");
const error_1 = require("../middlewares/error");
const block_repository_1 = require("../repositories/block.repository");
const user_repository_1 = require("../repositories/user.repository");
const classesBlock_1 = require("../validators/classesBlock");
const baseUrl = `http://localhost:${process.env.PORT}`;
let ClassesBlockController = class ClassesBlockController {
    async create(req, res) {
        var _a;
        const { body, file } = req;
        try {
            await classesBlock_1.classesBlockSchema.validate(body);
        }
        catch (error) {
            if (error instanceof yup_1.ValidationError) {
                throw new error_1.ApiError(error.errors.join(' '), 400);
            }
        }
        const userIds = (_a = body.user) !== null && _a !== void 0 ? _a : [];
        console.log(file);
        const users = await user_repository_1.userRepository.findBy({ id: (0, typeorm_1.In)(userIds) });
        const block = block_repository_1.blockRepository.create(Object.assign(Object.assign({}, body), { cover: `${baseUrl}/${file === null || file === void 0 ? void 0 : file.path}` || '', users }));
        const result = await block_repository_1.blockRepository.save(block);
        return res.status(201).json(Object.assign(Object.assign({}, result), { users: userIds }));
    }
    async getBlocks(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const blocks = await block_repository_1.blockRepository.find({
            skip: (page - 1) * limit,
            take: limit,
        });
        return res.json({
            page,
            limit,
            blocks,
        });
    }
    async pathBlocks() { }
    async removeBlock(req, res) {
        const { id } = req.params;
    }
};
__decorate([
    (0, tsoa_1.Post)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassesBlockController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassesBlockController.prototype, "getBlocks", null);
__decorate([
    (0, tsoa_1.Patch)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassesBlockController.prototype, "pathBlocks", null);
__decorate([
    (0, tsoa_1.Delete)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassesBlockController.prototype, "removeBlock", null);
ClassesBlockController = __decorate([
    (0, tsoa_1.Route)('classesBlock'),
    (0, tsoa_1.Tags)('classesBlock')
], ClassesBlockController);
exports.default = ClassesBlockController;
