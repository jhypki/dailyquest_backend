import { Router } from 'express';
import usersController from '../controllers/users-controller';
import { sameUserOnly } from '../middlewares/same-user-only';
import tasksController from '../controllers/tasks-controller';

export const usersRoutes = Router();

usersRoutes.get('/', usersController.getAllUsers);
usersRoutes.get('/:id', usersController.getUserById);
usersRoutes.put('/:id', usersController.updateUser);
usersRoutes.delete('/:id', sameUserOnly, usersController.deleteUser);

usersRoutes.get('/:id/stats', usersController.getUserStatsById);

usersRoutes.get('/:id/tasks', tasksController.getTasksForUser);
