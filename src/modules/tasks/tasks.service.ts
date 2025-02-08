import tasksRepository from './tasks.repository';
import { Stats, Task, TaskStatus } from '@prisma/client';
import { TaskResponse } from './types/task-response';
import { mapTaskResponse } from '../../common/mappers/map-task-response';
import { NotFoundError } from '../../common/errors/not-found-error';
import statsService from '../stats/stats.service';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { calculateRewards } from './utils/calculate-rewards';
import { Rewards } from './types/rewards';
import { validateCreateTaskRequest } from './validators/validate-create-task-request';
import { CreateTaskRequest } from './types/create-task-request';

class TasksService {
    async getTasksForUser(userId: string): Promise<TaskResponse[] | null> {
        const tasks = await tasksRepository.getTasksForUser(userId);
        return tasks ? tasks.map(mapTaskResponse) : null;
    }

    async createTask(task: CreateTaskRequest, userId: string): Promise<TaskResponse> {
        await validateCreateTaskRequest(task);

        const calculatedRewards: Rewards = calculateRewards(task.category, task.difficulty);
        console.log(calculatedRewards);

        const createdTask = await tasksRepository.create({
            ...task,
            userId,
            status: TaskStatus.pending,
            createdAt: new Date(),
            ...calculatedRewards,
            startDate: task.startDate ? new Date(task.startDate) : null,
            dueDate: task.dueDate ? new Date(task.dueDate) : null
        });

        return mapTaskResponse(createdTask);
    }

    async updateTask(task: Task): Promise<Task> {
        return await tasksRepository.update(task.id, task);
    }

    async deleteTask(taskId: string): Promise<Task> {
        return await tasksRepository.delete(taskId);
    }

    async completeTask(taskId: string): Promise<Task> {
        const task = await tasksRepository.findById(taskId);
        if (!task) {
            throw new NotFoundError('Task not found');
        }

        if (task.status === TaskStatus.completed) {
            throw new BadRequestError('Task already completed');
        }

        const updatedTask = {
            ...task,
            status: TaskStatus.completed
        } as Task;

        await statsService.updateStats(updatedTask.userId, mapTaskResponse(updatedTask).rewards as Partial<Stats>);

        return await tasksRepository.update(taskId, updatedTask);
    }
}

export default new TasksService();