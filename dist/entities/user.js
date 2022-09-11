"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const baseEntity_1 = require("./baseEntity");
class User extends baseEntity_1.BaseEntity {
    constructor(parameters, id) {
        super(parameters, id);
    }
    static async create(parameters, id) {
        return new User(parameters, id);
    }
}
exports.User = User;
