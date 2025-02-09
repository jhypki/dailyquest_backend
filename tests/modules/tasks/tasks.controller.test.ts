import tasksController from '../../../src/modules/tasks/tasks.controller';
import tasksService from '../../../src/modules/tasks/tasks.service';
import { CustomRequest } from '../../../src/common/types/custom-request';
import { NextFunction, Response } from 'express';
import { TaskResponse } from '../../../src/modules/tasks/types/task-response';

describe('Tasks Controller', () => {
    let req: Partial<CustomRequest>;
    let res: Partial<Response>;
    let next: Partial<NextFunction>;

    let taskResponse: TaskResponse;
    let tasks: TaskResponse[];

    beforeEach(() => {
        jest.resetAllMocks();

        req = {
            body: {
                name: 'task'
            },
            params: {
                id: '1'
            },
            user: {
                id: '1',
                username: 'test',
                email: 'test@test.com'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        next = jest.fn();

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

        tasks = [
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
    });

    describe('getTasksForUser', () => {
        it('should return tasks for user', async () => {
            // Arrange
            tasksService.getTasksForUser = jest.fn().mockResolvedValue(tasks);

            // Act
            await tasksController.getTasksForUser(req as CustomRequest, res as Response, next as NextFunction);

            // Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(tasks);
        });

        it('should call next function if an error is thrown', async () => {
            // Arrange
            tasksService.getTasksForUser = jest.fn().mockRejectedValue(new Error('error'));

            // Act
            await tasksController.getTasksForUser(req as CustomRequest, res as Response, next as NextFunction);

            // Assert
            expect(next).toHaveBeenCalled();
        });
    });

    describe('createTask', () => {
        it('should create a task', async () => {
            // Arrange
            tasksService.createTask = jest.fn().mockResolvedValue(taskResponse);

            // Act
            await tasksController.createTask(req as CustomRequest, res as Response, next as NextFunction);

            // Assert
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(taskResponse);
        });

        it('should call next function if an error is thrown', async () => {
            // Arrange
            tasksService.createTask = jest.fn().mockRejectedValue(new Error('error'));

            // Act
            await tasksController.createTask(req as CustomRequest, res as Response, next as NextFunction);

            // Assert
            expect(next).toHaveBeenCalled();
        });
    });

    describe('completeTask', () => {
        it('should complete a task', async () => {
            // Arrange
            tasksService.completeTask = jest.fn().mockResolvedValue(taskResponse);

            // Act
            await tasksController.completeTask(req as CustomRequest, res as Response, next as NextFunction);

            // Assert
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(taskResponse);
        });

        it('should call next function if an error is thrown', async () => {
            // Arrange
            tasksService.completeTask = jest.fn().mockRejectedValue(new Error('error'));

            // Act
            await tasksController.completeTask(req as CustomRequest, res as Response, next as NextFunction);

            // Assert
            expect(next).toHaveBeenCalled();
        });
    });
});