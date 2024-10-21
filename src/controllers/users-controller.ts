import { Request, Response, Express } from "express";

export class UsersController {
  async getUsers(req: Request, res: Response) {
    res.send("Hello, world!");
  }
}
