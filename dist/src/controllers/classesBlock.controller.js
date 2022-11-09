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
let ClassesBlockController = class ClassesBlockController {
    async create(req, res) {
        var _a, _b;
        const { body, file } = req;
        try {
            await classesBlock_1.classesBlockSchema.validate(body);
        }
        catch (error) {
            if (error instanceof yup_1.ValidationError) {
                throw new error_1.ApiError(error.errors.join(' '), 400);
            }
        }
        const userIds = (_a = body.users) !== null && _a !== void 0 ? _a : [];
        const users = await user_repository_1.userRepository.findBy({ id: (0, typeorm_1.In)(userIds) });
        const block = block_repository_1.blockRepository.create(Object.assign(Object.assign({}, body), { 
            //@ts-ignore
            cover: (_b = file === null || file === void 0 ? void 0 : file.location) !== null && _b !== void 0 ? _b : null, users }));
        const result = await block_repository_1.blockRepository.save(block);
        return res.status(201).json(Object.assign(Object.assign({}, result), { users: userIds }));
    }
    async getBlocks(req, res) {
        var _a;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const user_ids = ((_a = req.query.user_ids) === null || _a === void 0 ? void 0 : _a.split(',')) || [];
        //?user_ids=d3ef5420-263c-453b-9e7e-92ab80171850
        const where = user_ids.length > 0 ? { id: (0, typeorm_1.In)(user_ids) } : {};
        const blocks = await block_repository_1.blockRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['users'],
            where: {
                users: where,
            },
        });
        return res.json({
            page,
            limit,
            blocks,
        });
    }
    async getBlock(req, res) {
        const { id } = req.params;
        const block = await block_repository_1.blockRepository.findOne({
            where: { id },
            relations: ['users'],
        });
        if (!block) {
            throw new error_1.ApiError('Esse bloco não existe.', 400);
        }
        return res.json(block);
    }
    async pathBlocks(req, res) {
        var _a, _b;
        const { body, file, params } = req;
        try {
            await classesBlock_1.classesBlockSchema.validate(body);
        }
        catch (error) {
            if (error instanceof yup_1.ValidationError) {
                throw new error_1.ApiError(error.errors.join(' '), 400);
            }
        }
        const block = await block_repository_1.blockRepository.findOne({
            where: { id: String(params.id) },
            relations: ['users'],
        });
        if (!block) {
            throw new error_1.ApiError('Esse bloco não existe.', 400);
        }
        const userIds = (_a = body.users) !== null && _a !== void 0 ? _a : [];
        const users = await user_repository_1.userRepository.findBy({ id: (0, typeorm_1.In)(userIds) });
        // update block with request data, keep the same cover if no new file is provided, keep the same users if no new users are provided,
        const updatedBlock = block_repository_1.blockRepository.merge(block, Object.assign(Object.assign({}, body), { 
            //@ts-ignore
            cover: (_b = file === null || file === void 0 ? void 0 : file.location) !== null && _b !== void 0 ? _b : block.cover, users }));
        return res.json(Object.assign({}, updatedBlock));
    }
    async removeBlock(req, res) {
        const { id } = req.params;
        const block = await block_repository_1.blockRepository.findOne({
            where: { id },
        });
        if (!block) {
            throw new error_1.ApiError('Esse bloco não existe.', 400);
        }
        await block_repository_1.blockRepository.remove(block);
        return res.status(204).send();
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
    (0, tsoa_1.Get)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassesBlockController.prototype, "getBlock", null);
__decorate([
    (0, tsoa_1.Patch)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
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
