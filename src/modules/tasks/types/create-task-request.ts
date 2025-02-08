import { Category } from '@prisma/client';

export interface CreateTaskRequest {
    description: string;
    title: string;
    dueDate: string;
    category: Category;
    negativeTask: boolean;
    difficulty: number;
}
