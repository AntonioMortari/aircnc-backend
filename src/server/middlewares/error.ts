import { AppError } from '../errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware = (
    error: Error & Partial<AppError>,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    const message = typeof error.getStatusCode === 'function' ? error.message : 'Internal Server Error';
    const statusCode = typeof error.getStatusCode === 'function' ? error.getStatusCode() :  StatusCodes.INTERNAL_SERVER_ERROR;
    
    return res.status(statusCode).json({
        error:{
            message,
            status: statusCode,
            timestamp: new Date(),
            path: req.url
        }
    });
};

export { errorMiddleware };