import prisma from '../../config/prisma/prisma';
import { PrismaClient } from '@prisma/client';
import { Task } from '@prisma/client';

class TasksRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async findById(taskId: string): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: { id: taskId }
        });
    }

    async create(task: Omit<Task, 'id'>): Promise<Task> {
        return prisma.task.create({
            data: task
        });
    }

    async update(taskId: string, task: Task): Promise<Task> {
        return prisma.task.update({
            where: { id: taskId },
            data: task
        });
    }

    async delete(taskId: string): Promise<Task> {
        return prisma.task.delete({
            where: { id: taskId }
        });
    }

    async getTasksForUser(userId: string): Promise<Task[] | null> {
        return this.prisma.task.findMany({
            where: { userId }
        });
    }
}

export default new TasksRepository();
