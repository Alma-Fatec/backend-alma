"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = void 0;
const nodeEnv = process.env.NODE_ENV || 'development';
exports.baseUrl = nodeEnv == 'development' ? `http://localhost:${process.env.PORT}` : '';
