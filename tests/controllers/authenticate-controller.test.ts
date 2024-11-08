import { Request, Response, NextFunction } from 'express';
import authenticateController from '../../src/controllers/authenticate-controller';
import usersService from '../../src/services/users-service';
import { AuthenticateResponse } from '../../src/types/responses/authenticate-response';

describe('Authenticate Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: Partial<NextFunction>;

    let correctRegisterResponse: AuthenticateResponse;
    let correctLoginResponse: AuthenticateResponse;

    beforeEach(() => {
        jest.resetAllMocks();

        req = {
            body: {
                username: 'test',
                email: 'test@test.com',
                password: 'password'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();

        correctRegisterResponse = {
            token: 'token',
            user: {
                id: '1',
                username: 'test',
                email: 'test@test.com',
                picture: 'picture',
                firstName: 'first',
                lastName: 'last',
                createdAt: '2021-01-01T00:00:00.000Z'
            }
        };

        correctLoginResponse = {
            token: 'token',
            user: {
                id: '1',
                username: 'test',
                email: 'test@test.com',
                picture: 'picture',
                firstName: 'first',
                lastName: 'last',
                createdAt: '2021-01-01T00:00:00.000Z'
            }
        };

        usersService.register = jest.fn().mockResolvedValue(correctRegisterResponse);

        usersService.login = jest.fn().mockResolvedValue(correctLoginResponse);
    });

    describe('register', () => {
        it('should return 201 status code and user', async () => {
            // Act
            await authenticateController.register(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(correctRegisterResponse);
        });

        it('should call next with an error', async () => {
            const error = new Error('Test error');
            usersService.register = jest.fn().mockRejectedValue(error);

            // Act
            await authenticateController.register(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(next).toHaveBeenCalledWith(error);
        });

        it('should call register with correct arguments', async () => {
            // Act
            await authenticateController.register(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(usersService.register).toHaveBeenCalledWith(req.body.username, req.body.email, req.body.password);
        });

        it('should call register with correct arguments when email is undefined', async () => {
            // Arrange
            req.body.email = undefined;

            // Act
            await authenticateController.register(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(usersService.register).toHaveBeenCalledWith(req.body.username, undefined, req.body.password);
        });

        it('should call register with correct arguments when username is undefined', async () => {
            // Arrange
            req.body.username = undefined;

            // Act
            await authenticateController.register(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(usersService.register).toHaveBeenCalledWith(undefined, req.body.email, req.body.password);
        });
    });

    describe('login', () => {
        it('should return 200 status code and user', async () => {
            // Act
            await authenticateController.login(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(correctLoginResponse);
        });

        it('should call next with an error', async () => {
            const error = new Error('Test error');
            usersService.login = jest.fn().mockRejectedValue(error);

            // Act
            await authenticateController.login(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(next).toHaveBeenCalledWith(error);
        });

        it('should call login with correct arguments', async () => {
            // Act
            await authenticateController.login(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(usersService.login).toHaveBeenCalledWith(req.body.username, req.body.email, req.body.password);
        });

        it('should call login with correct arguments when email is undefined', async () => {
            // Arrange
            req.body.email = undefined;

            // Act
            await authenticateController.login(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(usersService.login).toHaveBeenCalledWith(req.body.username, undefined, req.body.password);
        });

        it('should call login with correct arguments when username is undefined', async () => {
            // Arrange
            req.body.username = undefined;

            // Act
            await authenticateController.login(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(usersService.login).toHaveBeenCalledWith(undefined, req.body.email, req.body.password);
        });
    });
});
