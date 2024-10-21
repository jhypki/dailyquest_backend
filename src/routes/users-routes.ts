import { Router } from "express";
import usersController from "../controllers/users-controller";

export const userRoutes = Router();

userRoutes.get("/", usersController.getAllUsers);
userRoutes.get("/:id", usersController.getUserById);
userRoutes.post("/", usersController.createUser);
