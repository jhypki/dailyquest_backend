import tasksRepository from '../repositories/tasks-repository';
import { Task, TaskStatus } from '@prisma/client';

class TasksService {
    //TODO return rewards in an object
    async getTasksForUser(userId: string) {
        return tasksRepository.getTasksForUser(userId);
    }

    async createTask(task: Omit<Task, 'id'>, userId: string) {
        return tasksRepository.create({
            ...task,
            userId,
            status: TaskStatus.pending,
            createdAt: new Date()
        });
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
