import { Router } from 'express';
import usersController from '../controllers/users-controller';

export const usersRoutes = Router();

usersRoutes.get('/', usersController.getAllUsers);
usersRoutes.get('/:id', usersController.getUserById);
