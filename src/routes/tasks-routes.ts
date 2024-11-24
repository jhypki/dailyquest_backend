import { Router } from 'express';
import tasksController from '../controllers/tasks-controller';

export const tasksRoutes = Router();

tasksRoutes.get('/:userId', tasksController.getTasksForUser);
tasksRoutes.post('/', tasksController.createTask);
