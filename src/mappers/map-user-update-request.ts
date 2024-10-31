import { Request } from 'express';
import { UpdateUserRequest } from '../types/update-user-request';

export const mapUserUpdateRequest = (req: Request): UpdateUserRequest => {
    const requestBody = req.body;
    const dataToUpdate: UpdateUserRequest = {
        username: requestBody.username,
        email: requestBody.email,
        password: requestBody.password,
        picture: requestBody.picture,
        firstName: requestBody.firstName,
        lastName: requestBody.lastName
    };

    return dataToUpdate;
};
