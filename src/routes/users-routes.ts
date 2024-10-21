import { Router } from "express";
import { UsersController } from "../controllers";

export const userRoutes = Router();
const usersController = new UsersController();

userRoutes.get("/", usersController.getUsers);
