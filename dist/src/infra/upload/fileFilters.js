"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function classesBlock(filename) {
    return !!filename.match(/\.(jpg|jpeg|png)$/);
}
function classes(filename) {
    return !!filename.match(/\.(jpg|jpeg|png)$/);
}
const filters = {
    classesBlock,
    classes,
};
exports.default = filters;
