import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: CustomError | Error, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json(err.serializeErrors());
        return;
    }

    console.error(err);

    res.status(500).json({
        message: 'Something went wrong',
        statusCode: 500
    });
};

export default errorHandler;
