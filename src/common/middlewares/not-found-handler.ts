import { NextFunction, Request, Response } from 'express';

const notFoundHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
        message: 'Not Found',
        statusCode: 404
    });
    next();
};

export default notFoundHandler;