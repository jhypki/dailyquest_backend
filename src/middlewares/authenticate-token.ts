import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/requests/custom-request';
import { BasicUserData } from '../types/common/basic-user-data';
import { unless } from 'express-unless';
import { UnauthorizedError } from '../utils/errors/unauthorized-error';
import { JWT_SECRET } from '../config/constants';

const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(new UnauthorizedError('Authorization token not provided'));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded as BasicUserData;
        next();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        return next(new UnauthorizedError('Invalid authorization token'));
    }
};

authenticateToken.unless = unless;

export default authenticateToken;
