import { Category } from '@prisma/client';

export interface CreateTaskRequest {
    description: string;
    title: string;
    dueDate?: Date;
    startDate?: Date;
    category: Category;
    negativeTask: boolean;
    difficulty: number;
}
