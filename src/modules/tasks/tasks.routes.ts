import { RequestHandler, Router } from 'express';
import tasksController from './tasks.controller';

export const tasksRoutes = Router();

// tasksRoutes.get('/:taskId', tasksController.getTaskById);
tasksRoutes.post('/', tasksController.createTask as RequestHandler);
tasksRoutes.put('/:id/complete', tasksController.completeTask as RequestHandler);
