"use strict";
// write a permissions middleware that checks if the user has the required permissions to access the route
// the middleware should receive the required permissions as an argument
// the middleware should check if the user has the required permissions
// the middleware should throw an error if the user does not have the required permissions
// the middleware should call the next function if the user has the required permissions
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermissions = void 0;
const user_repository_1 = require("../repositories/user.repository");
const checkPermissions = (permissions) => {
    return async (req, res, next) => {
        //@ts-ignore
        const { userId } = req;
        const user = await user_repository_1.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não existe' });
        }
        const permissionExists = permissions.some((permission) => permission === user.role);
        if (!permissionExists) {
            return res.status(403).json({
                mesage: 'Você não tem permissão para acessar esse recurso',
            });
        }
        return next();
    };
};
exports.checkPermissions = checkPermissions;
