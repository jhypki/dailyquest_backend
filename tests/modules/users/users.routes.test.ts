import express from 'express';
import { usersRoutes } from '../../../src/modules/users/users.routes';
import usersController from '../../../src/modules/users/users.controller';
import request from 'supertest';

jest.mock('../../../src/modules/users/users.controller', () => ({
    getAllUsers: jest.fn((req, res) => res.status(200).json({})),
    getUserById: jest.fn((req, res) => res.status(200).json({})),
    updateUser: jest.fn((req, res) => res.status(200).json({})),
    deleteUser: jest.fn((req, res) => res.status(200).json({})),
    getUserStatsById: jest.fn((req, res) => res.status(200).json({}))
}));

jest.mock('../../../src/common/middlewares/same-user-only', () => ({
    sameUserOnly: jest.fn((req, res, next) => {
        next();
    })
}));

describe('Users Routes', () => {
    const app = express();

    beforeAll(() => {
        app.use(express.json());
        app.use('/users', usersRoutes);
    });

    it('should call getAllUsers controller method when GET /users', async () => {
        // Act
        await request(app).get('/users');

        // Assert
        expect(usersController.getAllUsers).toHaveBeenCalled();
    });

    it('should call getUserById controller method when GET /users/:id', async () => {
        // Act
        await request(app).get('/users/1');

        // Assert
        expect(usersController.getUserById).toHaveBeenCalled();
    });

    it('should call updateUser controller method when PUT /users/:id', async () => {
        // Act
        await request(app).put('/users/1');

        // Assert
        expect(usersController.updateUser).toHaveBeenCalled();
    });

    it('should call deleteUser controller method when DELETE /users/:id', async () => {
        // Act
        await request(app).delete('/users/1');

        // Assert
        expect(usersController.deleteUser).toHaveBeenCalled();
    });

    it('should call getUserStatsById controller method when GET /users/:id/stats', async () => {
        // Act
        await request(app).get('/users/1/stats');

        // Assert
        expect(usersController.getUserStatsById).toHaveBeenCalled();
    });
});
