import { Router } from 'express';
import tasksController from '../controllers/tasks-controller';

export const tasksRoutes = Router();

// tasksRoutes.get('/:taskId', tasksController.getTaskById);
tasksRoutes.post('/', tasksController.createTask);
