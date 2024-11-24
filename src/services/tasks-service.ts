import tasksRepository from '../repositories/tasks-repository';
import { Task, TaskStatus } from '@prisma/client';
import { TaskResponse } from '../types/responses/task-response';
import { mapTaskResopnse } from '../mappers/map-task-response';

class TasksService {
    //TODO return rewards in an object
    async getTasksForUser(userId: string): Promise<TaskResponse[] | null> {
        const tasks = await tasksRepository.getTasksForUser(userId);
        return tasks ? tasks.map(mapTaskResopnse) : null;
    }

    async createTask(task: Omit<Task, 'id'>, userId: string): Promise<TaskResponse> {
        const createdTask = await tasksRepository.create({
            ...task,
            userId,
            status: TaskStatus.pending,
            createdAt: new Date()
        });

        return mapTaskResopnse(createdTask);
    }

    async updateTask(taskId: string, task: Task) {
        return tasksRepository.update(taskId, task);
    }

    async deleteTask(taskId: string) {
        return tasksRepository.delete(taskId);
    }

    async completeTask(taskId: string) {
        const task = await tasksRepository.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }

        const updatedTask = {
            ...task,
            status: TaskStatus.completed
        } as Task;

        return tasksRepository.update(taskId, updatedTask);
    }
}

export default new TasksService();
