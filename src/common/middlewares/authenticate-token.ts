import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/custom-request';
import { BasicUserData } from '../types/basic-user-data';
import { unless } from 'express-unless';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { JWT_SECRET } from '../../config/env';

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
    } catch (error) {
        return next(new UnauthorizedError('Invalid authorization token'));
    }
};

authenticateToken.unless = unless;

export default authenticateToken;
