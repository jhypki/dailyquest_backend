import { Category, Task, TaskStatus } from '@prisma/client';
import { mapTaskResponse } from './../../../src/common/mappers/map-task-response';
import { TaskResponse } from '../../../src/modules/tasks/types/task-response';

describe('mapTaskResponse', () => {
    let task: Task;
    let taskResponse: TaskResponse;

    beforeEach(() => {
        task = {
            id: '1',
            userId: '1',
            title: 'title',
            description: 'description',
            category: Category.personal_development,
            status: TaskStatus.in_progress,
            negativeTask: false,
            createdAt: new Date(),
            dueDate: new Date(),
            startDate: new Date(),
            strengthReward: 1,
            intelligenceReward: 1,
            vitalityReward: 1,
            charismaReward: 1,
            enduranceReward: 1,
            agilityReward: 1,
            difficulty: 1
        };

        taskResponse = {
            id: '1',
            userId: '1',
            title: 'title',
            description: 'description',
            category: Category.personal_development,
            status: TaskStatus.in_progress,
            negativeTask: false,
            createdAt: task.createdAt.toISOString(),
            dueDate: task.dueDate?.toISOString(),
            startDate: task.startDate?.toISOString(),
            rewards: {
                strength: 1,
                intelligence: 1,
                vitality: 1,
                charisma: 1,
                endurance: 1,
                agility: 1
            }
        };
    });

    it('should map task to task response', () => {
        // Act
        const result = mapTaskResponse(task);

        // Assert
        expect(result).toEqual(taskResponse);
    });

    it('should map task to task response with undefined due date', () => {
        // Arrange
        task.dueDate = null;

        // Act
        const result = mapTaskResponse(task);

        // Assert
        expect(result).toEqual({ ...taskResponse, dueDate: undefined });
    });

    it('should map task to task response with undefined start date', () => {
        // Arrange
        task.startDate = null;

        // Act
        const result = mapTaskResponse(task);

        // Assert
        expect(result).toEqual({ ...taskResponse, startDate: undefined });
    });

    it('should map task to task response with undefined due date and start date', () => {
        // Arrange
        task.dueDate = null;
        task.startDate = null;

        // Act
        const result = mapTaskResponse(task);

        // Assert
        expect(result).toEqual({ ...taskResponse, dueDate: undefined, startDate: undefined });
    });

    it('should map task to task response with undefined due date, start date and rewards', () => {
        // Arrange
        task.dueDate = null;
        task.startDate = null;
        task.strengthReward = null;
        task.intelligenceReward = null;
        task.vitalityReward = null;
        task.charismaReward = null;
        task.enduranceReward = null;
        task.agilityReward = null;

        // Act
        const result = mapTaskResponse(task);

        // Assert
        expect(result).toEqual({
            ...taskResponse,
            dueDate: undefined,
            startDate: undefined,
            rewards: {
                strength: null,
                intelligence: null,
                vitality: null,
                charisma: null,
                endurance: null,
                agility: null
            }
        });
    });
});
