import authController from '../../../src/modules/auth/auth.controller';
import request from 'supertest';
import { authRoutes } from '../../../src/modules/auth/auth.routes';
import express from 'express';

jest.mock('../../../src/modules/auth/auth.controller', () => ({
    register: jest.fn((req, res) => res.status(201).json({ token: '123' })),
    login: jest.fn((req, res) => res.status(200).json({ token: '123' }))
}));

describe('Auth Routes', () => {
    const app = express();

    beforeAll(() => {
        app.use(express.json());
        app.use('/auth', authRoutes);
    });

    it('should call register controller on POST /register', async () => {
        // Act
        await request(app)
            .post('/auth/register')
            .send({
                username: 'test',
                email: 'test@test.com',
                password: 'password'
            });

        // Assert
        expect(authController.register).toHaveBeenCalled();
    });

    it('should call login controller on POST /login', async () => {
        // Act
        await request(app)
            .post('/auth/login')
            .send({
                username: 'test',
                email: 'test@test.com',
                password: 'password'
            });

        // Assert
        expect(authController.login).toHaveBeenCalled();
    });
});
