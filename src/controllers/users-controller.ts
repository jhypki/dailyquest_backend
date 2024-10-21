import { Request, Response } from "express";
import usersService from "../services/users-service";

export class UsersController {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await usersService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const user = await usersService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const user = await usersService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default new UsersController();
