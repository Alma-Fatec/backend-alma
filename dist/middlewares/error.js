"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
const errorMiddleware = (error, req, res, next) => {
    var _a;
    console.log(error);
    const statusCode = (_a = error.statusCode) !== null && _a !== void 0 ? _a : 500;
    const message = error.statusCode ? error.message : 'Internal Server Error';
    return res.status(statusCode).json({ message });
};
exports.errorMiddleware = errorMiddleware;
