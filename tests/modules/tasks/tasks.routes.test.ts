import request from 'supertest';
import express from 'express';
import { tasksRoutes } from '../../../src/modules/tasks/tasks.routes';
import tasksController from '../../../src/modules/tasks/tasks.controller';

jest.mock('../../../src/modules/tasks/tasks.controller', () => ({
    getTasksForUser: jest.fn((req, res) => res.status(200).json({})),
    createTask: jest.fn((req, res) => res.status(201).json({})),
    completeTask: jest.fn((req, res) => res.status(200).json({}))
}));

describe('Auth Routes', () => {
    const app = express();

    beforeAll(() => {
        app.use(express.json());
        app.use('/tasks', tasksRoutes);
    });

    it('should call createTask controller on POST /tasks', async () => {
        // Act
        await request(app).post('/tasks');

        // Assert
        expect(tasksController.createTask).toHaveBeenCalled();
    });

    it('should call completeTask controller on put /tasks/:id/complete', async () => {
        // Act
        await request(app).put('/tasks/1/complete');

        // Assert
        expect(tasksController.completeTask).toHaveBeenCalled();
    });
});
