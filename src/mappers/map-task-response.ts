import { Task } from '@prisma/client';
import { TaskResponse } from '../types/responses/task-response';

export const mapTaskResopnse = (task: Task): TaskResponse => {
    return {
        id: task.id,
        userId: task.userId,
        title: task.title,
        description: task.description,
        category: task.category,
        status: task.status,
        negativeTask: task.negativeTask,
        createdAt: task.createdAt.toISOString(),
        dueDate: task.dueDate.toISOString(),
        startDate: task.startDate.toISOString(),
        rewards: {
            strength: task.strengthReward,
            intelligence: task.intelligenceReward,
            dexterity: task.dexterityReward,
            vitality: task.vitalityReward,
            charisma: task.charismaReward,
            endurance: task.enduranceReward
        }
    };
};
