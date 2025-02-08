import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { BasicUserData } from '../../../common/types/basic-user-data';
import { JWT_EXPIRATION, JWT_SECRET } from '../../../config/env';

export function generateToken(user: User) {
    const payload: BasicUserData = {
        id: user.id,
        username: user.username,
        email: user.email
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

export function verifyToken(token: string) {
    return new Promise<User>((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded as User);
        });
    });
}
