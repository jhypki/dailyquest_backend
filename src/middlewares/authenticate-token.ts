import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/custom-request';
import { BasicUserData } from '../types/basic-user-data';
import { BadRequestError } from '../utils/errors/bad-request-error';
import { unless } from 'express-unless';
import { UnauthorizedError } from '../utils/errors/unauthorized-error';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(req.headers);

    if (!token) {
        return next(new UnauthorizedError('Authorization token not provided'));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded as BasicUserData;
        console.log('User authenticated:', req.user);
        next();
    } catch (err) {
        return next(new UnauthorizedError('Invalid authorization token'));
    }
};

authenticateToken.unless = unless;

export default authenticateToken;
