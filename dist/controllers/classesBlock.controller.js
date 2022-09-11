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
const createClassesBlock_service_1 = require("../services/classesBlock/createClassesBlock.service");
const deleteClassesBlock_service_1 = require("../services/classesBlock/deleteClassesBlock.service");
const listClassesBlock_service_1 = require("../services/classesBlock/listClassesBlock.service");
const patchClassesBlock_service_1 = require("../services/classesBlock/patchClassesBlock.service");
let ClassesBlockController = class ClassesBlockController {
    async create(req) {
        var _a;
        const createClassesBlockService = new createClassesBlock_service_1.CreateClassesBlockService();
        const result = await createClassesBlockService.execute(Object.assign(Object.assign({}, req.body), { cover: `http://${process.env.HOST}:${process.env.PORT}/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.path}` ||
                '' }));
        return result;
    }
    async getBlocks() {
        const listUserService = new listClassesBlock_service_1.ListClassesBlockService();
        const result = await listUserService.execute();
        return result;
    }
    async pathBlocks(id, body) {
        console.log('id do recurso>:', id);
        const listUserService = new patchClassesBlock_service_1.PatchClassesBlockService();
        const result = await listUserService.execute(id, body);
        return result;
    }
    async removeBlock(id) {
        console.log('id do recurso>:', id);
        const listUserService = new deleteClassesBlock_service_1.DeleteClassesBlockService();
        const result = await listUserService.execute(id);
        return result;
    }
};
__decorate([
    (0, tsoa_1.Post)('/'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassesBlockController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassesBlockController.prototype, "getBlocks", null);
__decorate([
    (0, tsoa_1.Patch)('/'),
    __param(0, (0, tsoa_1.Query)('id')),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClassesBlockController.prototype, "pathBlocks", null);
__decorate([
    (0, tsoa_1.Delete)('/'),
    __param(0, (0, tsoa_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClassesBlockController.prototype, "removeBlock", null);
ClassesBlockController = __decorate([
    (0, tsoa_1.Route)('classesBlock'),
    (0, tsoa_1.Tags)('classesBlock')
], ClassesBlockController);
exports.default = ClassesBlockController;
