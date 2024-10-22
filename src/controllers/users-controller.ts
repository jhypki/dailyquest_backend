import { NextFunction, Request, Response } from 'express';
import usersService from '../services/users-service';

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
}

export default new UsersController();
