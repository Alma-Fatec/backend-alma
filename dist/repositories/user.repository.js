"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_1 = require("../entities/user");
const dataSource_1 = require("../infra/database/dataSource");
exports.userRepository = dataSource_1.AppDataSource.getRepository(user_1.User);
