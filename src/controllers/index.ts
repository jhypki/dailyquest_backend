import { Express } from "express";
import { UsersController } from "./users-controller";

export const InitializeControllers = (app: Express) => {
  UsersController(app);
};
