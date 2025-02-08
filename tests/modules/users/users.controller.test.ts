import usersController from '../../../src/modules/users/users.controller';
import usersService from '../../../src/modules/users/users.service';
import { NextFunction, Request, Response } from 'express';
import { UserResponseData } from '../../../src/modules/users/types/user-response-data';
import { CustomRequest } from '../../../src/common/types/custom-request';

jest.mock('../../../src/common/middlewares/same-user-only', () => ({
    sameUserOnly: jest.fn((req, res, next) => {
        next();
    })
}));

describe('Users Controller', () => {
    let req: Partial<CustomRequest>;
    let res: Partial<Response>;
    let next: Partial<NextFunction>;

    let users: UserResponseData[];

    beforeEach(() => {
        jest.resetAllMocks();

        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        next = jest.fn();

        users = [
            {
                id: '1',
                username: 'test',
                email: 'test@test.com'
            },
            {
                id: '2',
                username: 'test2',
                email: 'test2@test.com'
            }
        ];
    });

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            // Arrange
            usersService.getUsers = jest.fn().mockResolvedValue(users);

            // Act
            await usersController.getAllUsers(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(users);
        });

        it('should call next function if an error is thrown', async () => {
            // Arrange
            usersService.getUsers = jest.fn().mockRejectedValue(new Error('error'));

            // Act
            await usersController.getAllUsers(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(next).toHaveBeenCalled();
        });
    });

    describe('getUserById', () => {
        it('should return user by id', async () => {
            // Arrange
            const user = users[0];
            usersService.getUserById = jest.fn().mockResolvedValue(user);

            req.params = { id: '1' };

            // Act
            await usersController.getUserById(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(user);
        });

        it('should call next function if an error is thrown', async () => {
            // Arrange
            usersService.getUserById = jest.fn().mockRejectedValue(new Error('error'));

            req.params = { id: '1' };

            // Act
            await usersController.getUserById(req as Request, res as Response, next as NextFunction);

            // Assert
            expect(next).toHaveBeenCalled();
        });
    });

    describe('updateUser', () => {
        it('should update user', async () => {
            // Arrange
            const user = users[0];
            usersService.updateUser = jest.fn().mockResolvedValue(user);

            req.params = { id: '1' };
            req.user = { id: '1', username: 'test', email: 'test@test.com' };
            req.body = { username: 'newUsername' };

            // Act
            await usersController.updateUser(req as CustomRequest, res as Response, next as NextFunction);

            // Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(user);
        });

        it('should call next function if an error is thrown', async () => {
            // Arrange
            usersService.updateUser = jest.fn().mockRejectedValue(new Error('error'));

            req.params = { id: '1' };
            req.user = { id: '1', username: 'test', email: 'test@test.com' };
            req.body = { username: 'newUsername' };

            // Act
            await usersController.updateUser(req as CustomRequest, res as Response, next as NextFunction);

            // Assert
            expect(next).toHaveBeenCalled();
        });
    });

    describe('deleteUser', () => {
        it('should delete user', async () => {
            // Arrange
            req.params = { id: '1' };
            usersService.deleteUser = jest.fn().mockResolvedValue(undefined);

            // Act
            await usersController.deleteUser(req as CustomRequest, res as Response, next as NextFunction);

            // Assert
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });

        it('should call next function if an error is thrown', async () => {
            // Arrange
            usersService.deleteUser = jest.fn().mockRejectedValue(new Error('error'));

            req.params = { id: '1' };

            // Act
            await usersController.deleteUser(req as CustomRequest, res as Response, next as NextFunction);

            // Assert
            expect(next).toHaveBeenCalled();
        });
    });
});