// write a permissions middleware that checks if the user has the required permissions to access the route
// the middleware should receive the required permissions as an argument
// the middleware should check if the user has the required permissions
// the middleware should throw an error if the user does not have the required permissions
// the middleware should call the next function if the user has the required permissions

import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Roles } from '../entities/roles';
import { userRepository } from '../repositories/user.repository';
import { ApiError } from './error';

export const checkPermissions = (permissions: Roles[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req;

        const user = await userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            return res.status(400).json({ message: 'Usuário não existe' });
        }

        const permissionExists = permissions.some(
            (permission) => permission === user.role,
        );

        if (!permissionExists) {
            return res.status(403).json({
                mesage: 'Você não tem permissão para acessar esse recurso',
            });
        }

        return next();
    };
};
