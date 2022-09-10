"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
const uuid_1 = require("uuid");
class BaseEntity {
    constructor(parameters, id) {
        this._id = id !== null && id !== void 0 ? id : (0, uuid_1.v4)();
        this.props = parameters;
    }
}
exports.BaseEntity = BaseEntity;
