"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockRepository = void 0;
const block_1 = require("../entities/block");
const dataSource_1 = require("../infra/database/dataSource");
exports.blockRepository = dataSource_1.AppDataSource.getRepository(block_1.Block);
