import tasksService from '../../../src/modules/tasks/tasks.service';
import tasksRepository from '../../../src/modules/tasks/tasks.repository';
import { calculateRewards } from '../../../src/modules/tasks/utils/calculate-rewards';
import { TaskResponse } from '../../../src/modules/tasks/types/task-response';
import { Task } from '@prisma/client';
import { CreateTaskRequest } from '../../../src/modules/tasks/types/create-task-request';
import { validateCreateTaskRequest } from '../../../src/modules/tasks/validators/validate-create-task-request';
import statsService from '../../../src/modules/stats/stats.service';

jest.mock('../../../src/modules/tasks/tasks.repository');
jest.mock('../../../src/modules/tasks/utils/calculate-rewards');

describe('Tasks Service', () => {
    let taskResponse: TaskResponse;
    let tasksResponse: TaskResponse[];

    let createTaskRequest: CreateTaskRequest;

    let task: Task;
    let tasks: Task[];

    beforeEach(() => {
        jest.resetAllMocks();

        taskResponse = {
            id: '1',
            title: 'task',
            description: '',
            status: 'pending',
            createdAt: '2021-01-01T00:00:00.000Z',
            userId: '1',
            category: 'personal_development',
            negativeTask: false,
            rewards: {
                strength: 1,
                intelligence: 1,
                charisma: 1,
                vitality: 1,
                agility: 1,
                endurance: 1
            }
        };

        tasksResponse = [
            taskResponse,
            {
                id: '2',
                title: 'task2',
                description: '',
                status: 'pending',
                createdAt: '2021-01-01T00:00:00.000Z',
                userId: '1',
                category: 'personal_development',
                negativeTask: false,
                rewards: {
                    strength: 1,
                    intelligence: 1,
                    charisma: 1,
                    vitality: 1,
                    agility: 1,
                    endurance: 1
                }
            }
        ];

        task = {
            id: '1',
            title: 'task',
            description: '',
            status: 'pending',
            createdAt: new Date('2021-01-01T00:00:00.000Z'),
            userId: '1',
            category: 'personal_development',
            negativeTask: false,
            strengthReward: 1,
            intelligenceReward: 1,
            charismaReward: 1,
            vitalityReward: 1,
            agilityReward: 1,
            enduranceReward: 1,
            startDate: null,
            dueDate: null,
            difficulty: 0.1
        };

        tasks = [
            task,
            {
                id: '2',
                title: 'task2',
                description: '',
                status: 'pending',
                createdAt: new Date('2021-01-01T00:00:00.000Z'),
                userId: '1',
                category: 'personal_development',
                negativeTask: false,
                strengthReward: 1,
                intelligenceReward: 1,
                charismaReward: 1,
                vitalityReward: 1,
                agilityReward: 1,
                enduranceReward: 1,
                startDate: null,
                dueDate: null,
                difficulty: 0.1
            }
        ];

        createTaskRequest = {
            title: 'task',
            description: 'desc',
            category: 'personal_development',
            negativeTask: false,
            difficulty: 0.1
        };
    });

    describe('getTasksForUser', () => {
        it('should return tasks for user', async () => {
            // Arrange
            tasksRepository.getTasksForUser = jest.fn().mockResolvedValueOnce(tasks);

            // Act
            const result = await tasksService.getTasksForUser('1');

            // Assert
            expect(result).toEqual(tasksResponse);
        });

        it('should return null if no tasks found', async () => {
            // Arrange
            tasksRepository.getTasksForUser = jest.fn().mockResolvedValueOnce(null);

            // Act
            const result = await tasksService.getTasksForUser('1');

            // Assert
            expect(result).toBeNull();
        });
    });

    describe('createTask', () => {
        it('should create a task', async () => {
            // Arrange
            const calculatedRewards = {
                strength: 1,
                intelligence: 1,
                charisma: 1,
                vitality: 1,
                agility: 1,
                endurance: 1
            };

            (calculateRewards as jest.Mock).mockReturnValueOnce(calculatedRewards);
            tasksRepository.create = jest.fn().mockResolvedValueOnce(task);

            // Act
            const result = await tasksService.createTask(createTaskRequest, '1');

            // Assert
            expect(result).toEqual(taskResponse);
        });

        it('should throw an error if task is invalid', async () => {
            // Arrange
            tasksRepository.create = jest.fn().mockResolvedValueOnce(task);
            (validateCreateTaskRequest as jest.Mock) = jest.fn().mockRejectedValueOnce(new Error());

            // Act
            const createTask = tasksService.createTask(createTaskRequest, '1');

            // Assert
            await expect(createTask).rejects.toThrow();
        });
    });

    describe('completeTask', () => {
        it('should complete a task', async () => {
            // Arrange
            tasksRepository.findById = jest.fn().mockResolvedValueOnce(task);
            statsService.updateStats = jest.fn().mockResolvedValueOnce({});
            tasksRepository.update = jest.fn().mockResolvedValueOnce(task);

            // Act
            const result = await tasksService.completeTask('1');

            // Assert
            expect(result).toEqual(taskResponse);
        });

        it('should throw an error if task is not found', async () => {
            // Arrange
            tasksRepository.findById = jest.fn().mockResolvedValueOnce(null);

            // Act
            const completeTask = tasksService.completeTask('1');

            // Assert
            await expect(completeTask).rejects.toThrow();
        });

        it('should throw an error if task is already completed', async () => {
            // Arrange
            tasksRepository.findById = jest.fn().mockResolvedValueOnce({ ...task, status: 'completed' });

            // Act
            const completeTask = tasksService.completeTask('1');

            // Assert
            await expect(completeTask).rejects.toThrow();
        });
    });

    describe('updateTask', () => {
        it('should update a task', async () => {
            // Arrange
            tasksRepository.update = jest.fn().mockResolvedValueOnce(task);

            // Act
            const result = await tasksService.updateTask(task);

            // Assert
            expect(result).toEqual(task);
        });
    });

    describe('deleteTask', () => {
        it('should delete a task', async () => {
            // Arrange
            tasksRepository.delete = jest.fn().mockResolvedValueOnce(task);

            // Act
            const result = await tasksService.deleteTask('1');

            // Assert
            expect(result).toEqual(task);
        });
    });
});