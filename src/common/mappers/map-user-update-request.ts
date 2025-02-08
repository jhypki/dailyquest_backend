import { Request } from 'express';
import { UpdateUserRequest } from '../../modules/users/types/update-user-request';

export const mapUserUpdateRequest = (req: Request): UpdateUserRequest => {
    const requestBody = req.body;

    return {
        username: requestBody.username,
        email: requestBody.email,
        password: requestBody.password,
        picture: requestBody.picture,
        firstName: requestBody.firstName,
        lastName: requestBody.lastName
    };
};
