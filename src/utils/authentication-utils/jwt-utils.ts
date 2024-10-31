import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export function generateToken(user: User) {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
    return token;
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
