import { Response, NextFunction } from 'express';
import { CustomRequest } from '../types/requests/custom-request';
import { ForbiddenError } from '../errors/forbidden-error';

export const sameUserOnly = (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (req?.user?.id !== req.params.id) {
        return next(new ForbiddenError('You are not allowed to perform this action'));
    }
    next();
};
