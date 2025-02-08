import { Router } from 'express';
import usersController from './users.controller';
import { sameUserOnly } from '../../common/middlewares/same-user-only';

export const usersRoutes = Router();

usersRoutes.get('/', usersController.getAllUsers);
usersRoutes.get('/:id', usersController.getUserById);
usersRoutes.put('/:id', usersController.updateUser);
usersRoutes.delete('/:id', sameUserOnly, usersController.deleteUser);

usersRoutes.get('/:id/stats', usersController.getUserStatsById);
