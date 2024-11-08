import { User } from '@prisma/client';
import { UserResponseData } from '../types/responses/user-response-data';

export const mapUserResponse = (user: User): UserResponseData => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        picture: user.picture,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt.toISOString()
    };
};
