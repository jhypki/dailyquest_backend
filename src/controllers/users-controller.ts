import { NextFunction, Request, Response } from 'express';
import usersService from '../services/users-service';
import { CustomRequest } from '../types/custom-request';
import { mapUserUpdateRequest } from '../mappers/map-user-update-request';

export class UsersController {
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await usersService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await usersService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const idFromToken = req.user?.id;

            const user = await usersService.updateUser(idFromToken, req.params.id, mapUserUpdateRequest(req));
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            await usersService.deleteUser(req.user?.id, req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new UsersController();
