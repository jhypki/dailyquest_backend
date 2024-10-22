import { NextFunction, Request, Response } from 'express';
import usersService from '../services/users-service';

export class AuthenticateController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password } = req.body;

            const user = await usersService.register(username, email, password);

            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password } = req.body;

            const user = await usersService.login(username, email, password);

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthenticateController();
