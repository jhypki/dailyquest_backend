import { Response, NextFunction } from 'express';
import tasksService from './tasks.service';
import { CustomRequest } from '../../common/types/custom-request';

class TasksController {
    async getTasksForUser(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const tasks = await tasksService.getTasksForUser(req!.user!.id);
            res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    }

    async createTask(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const task = await tasksService.createTask(req.body, req!.user!.id);
            res.status(201).json(task);
        } catch (error) {
            next(error);
        }
    }

    async completeTask(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const task = await tasksService.completeTask(req.params.id);
            res.status(201).json(task);
        } catch (error) {
            next(error);
        }
    }
}

export default new TasksController();
