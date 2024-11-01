import { Router } from 'express';
import usersController from '../controllers/users-controller';

export const usersRoutes = Router();

usersRoutes.get('/', usersController.getAllUsers);
usersRoutes.get('/:id', usersController.getUserById);
usersRoutes.put('/:id', usersController.updateUser);
usersRoutes.delete('/:id', usersController.deleteUser);

usersRoutes.get('/:id/stats', usersController.getUserStatsById);
