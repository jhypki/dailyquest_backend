import { Router } from 'express';
import tasksController from './tasks.controller';

export const tasksRoutes = Router();

// tasksRoutes.get('/:taskId', tasksController.getTaskById);
tasksRoutes.post('/', tasksController.createTask);
tasksRoutes.put('/:id/complete', tasksController.completeTask);
