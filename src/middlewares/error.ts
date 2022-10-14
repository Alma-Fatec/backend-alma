import { NextFunction, Request, Response } from 'express';

export class ApiError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : 'Internal Server Error';
    return res.status(statusCode).json({ message });
};
