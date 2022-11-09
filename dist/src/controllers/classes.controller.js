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
const createClasses_service_1 = require("../services/classes/createClasses.service");
const deleteClasses_service_1 = require("../services/classes/deleteClasses.service");
const listClasses_service_1 = require("../services/classes/listClasses.service");
const patchClasses_service_1 = require("../services/classes/patchClasses.service");
let ClassesController = class ClassesController {
    async create(body) {
        const createClassesService = new createClasses_service_1.CreateClassesService();
        const result = await createClassesService.execute(Object.assign({}, body));
        return result;
    }
    async getClasses() {
        const listUserService = new listClasses_service_1.ListClassesService();
        const result = await listUserService.execute();
        return result;
    }
    async patchClasses(id, body) {
        console.log('id do recurso>:', id);
        const listUserService = new patchClasses_service_1.PatchClassesService();
        const result = await listUserService.execute(id, body);
        return result;
    }
    async removeClasses(id) {
        console.log('id do recurso>:', id);
        const listUserService = new deleteClasses_service_1.DeleteClassesService();
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
], ClassesController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "getClasses", null);
__decorate([
    (0, tsoa_1.Patch)('/'),
    __param(0, (0, tsoa_1.Query)('id')),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "patchClasses", null);
__decorate([
    (0, tsoa_1.Delete)('/'),
    __param(0, (0, tsoa_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "removeClasses", null);
ClassesController = __decorate([
    (0, tsoa_1.Route)('classes'),
    (0, tsoa_1.Tags)('classes')
], ClassesController);
exports.default = ClassesController;
