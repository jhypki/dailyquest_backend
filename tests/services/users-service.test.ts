import usersService from '../../src/services/users-service';
import { AuthenticateResponse } from '../../src/types/responses/authenticate-response';
import usersRepository from '../../src/repositories/users-repository';
import { Stats, User } from '@prisma/client';
import * as generateToken from '../../src/utils/authentication-utils/jwt-utils';
import * as hashPassword from '../../src/utils/authentication-utils/hash-password';
import * as verifyPassword from '../../src/utils/authentication-utils/verify-password';
import statsService from '../../src/services/stats-service';

describe('Users Service', () => {
    let correctRegisterResponse: AuthenticateResponse;
    let correctLoginResponse: AuthenticateResponse;
    let user: User;
    let username: string, email: string, password: string;
    let hashPasswordMock: jest.SpyInstance;
    let verifyPasswordMock: jest.SpyInstance;
    let generateTokenMock: jest.SpyInstance;
    let createStatsMock: jest.SpyInstance;

    beforeEach(() => {
        jest.resetAllMocks();

        user = {
            id: '1',
            username: 'test',
            email: 'test@test.com',
            passwordHash: 'password',
            createdAt: new Date(),
            picture: null,
            firstName: null,
            lastName: null
        };

        username = 'test';
        email = 'test@test.com';
        password = 'password';

        usersRepository.create = jest.fn().mockResolvedValue(user);
        usersRepository.findByEmail = jest.fn().mockResolvedValue(null);
        usersRepository.findByUsername = jest.fn().mockResolvedValue(null);

        correctRegisterResponse = {
            token: 'token',
            user: {
                id: '1',
                username: 'test',
                email: 'test@test.com',
                picture: null,
                firstName: null,
                lastName: null,
                createdAt: user.createdAt.toISOString()
            }
        };

        correctLoginResponse = {
            token: 'token',
            user: {
                id: '1',
                username: 'test',
                email: 'test@test.com',
                picture: null,
                firstName: null,
                lastName: null,
                createdAt: user.createdAt.toISOString()
            }
        };

        generateTokenMock = jest.spyOn(generateToken, 'generateToken').mockReturnValue('token');
        verifyPasswordMock = jest.spyOn(verifyPassword, 'verifyPassword').mockResolvedValue(true);
        hashPasswordMock = jest.spyOn(hashPassword, 'hashPassword').mockResolvedValue('password');
        createStatsMock = jest.spyOn(statsService, 'createStats').mockResolvedValue({} as Stats);
    });

    describe('register', () => {
        it('should return a token and user data', async () => {
            // Arrange
            usersRepository.findByEmail = jest.fn().mockResolvedValue(null);

            // Act
            const result = await usersService.register(username, email, password);

            // Assert
            expect(result).toEqual(correctRegisterResponse);
        });

        it('should throw an error if the email is already in use', async () => {
            // Arrange
            usersRepository.findByEmail = jest.fn().mockResolvedValue(user);

            let error: Error | undefined;

            // Act
            try {
                await usersService.register(username, email, password);
            } catch (e) {
                error = e as Error;
            }

            // Assert
            expect(error).toBeDefined();
            expect(error!.message).toBe('User with that email already exists');
        });

        it('should throw an error if the username is already in use', async () => {
            // Arrange
            usersRepository.findByUsername = jest.fn().mockResolvedValue(user);

            let error: Error | undefined;

            // Act
            try {
                await usersService.register(username, email, password);
            } catch (e) {
                error = e as Error;
            }

            // Assert
            expect(error).toBeDefined();
            expect(error!.message).toBe('User with that username already exists');
        });

        it('should call hashPassword with the correct arguments', async () => {
            // Act
            await usersService.register(username, email, password);

            // Assert
            expect(hashPasswordMock).toHaveBeenCalledWith(password);
        });

        it('should call usersRepository.create with the correct arguments', async () => {
            // Act
            await usersService.register(username, email, password);

            // Assert
            expect(usersRepository.create).toHaveBeenCalledWith({
                username,
                email,
                firstName: null,
                lastName: null,
                picture: null,
                passwordHash: 'password',
                createdAt: expect.any(Date)
            });
        });

        it('should call generateToken with the correct arguments', async () => {
            // Act
            await usersService.register(username, email, password);

            // Assert
            expect(generateTokenMock).toHaveBeenCalledWith(user);
        });

        it('should throw an error if username is not provided', async () => {
            // Arrange
            username = undefined as any;

            let error: Error | undefined;

            // Act
            try {
                await usersService.register(username, email, password);
            } catch (e) {
                error = e as Error;
            }

            // Assert
            expect(error).toBeDefined();
            expect(error!.message).toBe('Invalid user data');
        });

        it('should throw an error if email is not provided', async () => {
            // Arrange
            email = undefined as any;

            let error: Error | undefined;

            // Act
            try {
                await usersService.register(username, email, password);
            } catch (e) {
                error = e as Error;
            }

            // Assert
            expect(error).toBeDefined();
            expect(error!.message).toBe('Invalid user data');
        });

        it('should throw an error if password is not provided', async () => {
            // Arrange
            password = undefined as any;

            let error: Error | undefined;

            // Act
            try {
                await usersService.register(username, email, password);
            } catch (e) {
                error = e as Error;
            }

            // Assert
            expect(error).toBeDefined();
            expect(error!.message).toBe('Invalid user data');
        });

        it('should throw an error if password is less than 8 characters', async () => {
            // Arrange
            password = '1234567';
            let error: Error | undefined;

            // Act
            try {
                await usersService.register(username, email, password);
            } catch (e) {
                error = e as Error;
            }

            // Assert
            expect(error).toBeDefined();
            expect(error!.message).toBe('Invalid user data');
        });
    });

    describe('login', () => {
        it('should return a token and user data', async () => {
            // Arrange
            usersRepository.findByEmail = jest.fn().mockResolvedValue(user);

            // Act
            const result = await usersService.login(undefined, email, password);

            // Assert
            expect(result).toEqual(correctLoginResponse);
        });

        it('should return a token and user data when username is provided', async () => {
            // Arrange
            usersRepository.findByUsername = jest.fn().mockResolvedValue(user);
            email = undefined as any;

            // Act
            const result = await usersService.login(username, email, password);

            // Assert
            expect(result).toEqual(correctLoginResponse);
        });

        it('should return a token and user data when email is provided', async () => {
            // Arrange
            usersRepository.findByEmail = jest.fn().mockResolvedValue(user);
            username = undefined as any;

            // Act
            const result = await usersService.login(username, email, password);

            // Assert
            expect(result).toEqual(correctLoginResponse);
        });

        it('should throw an error if user is not found', async () => {
            // Arrange
            usersRepository.findByEmail = jest.fn().mockResolvedValue(null);

            let error: Error | undefined;

            // Act
            try {
                await usersService.login(username, email, password);
            } catch (e) {
                error = e as Error;
            }

            // Assert
            expect(error).toBeDefined();
            expect(error!.message).toBe('Invalid email or password');
        });

        it('should throw an error if password is incorrect', async () => {
            // Arrange
            verifyPasswordMock.mockResolvedValue(false);

            let error: Error | undefined;

            // Act
            try {
                await usersService.login(undefined, email, password);
            } catch (e) {
                error = e as Error;
            }

            // Assert
            expect(error).toBeDefined();
            expect(error!.message).toBe('Invalid email or password');
        });

        it('should call verifyPassword with the correct arguments', async () => {
            // Arrange
            usersRepository.findByEmail = jest.fn().mockResolvedValue(user);

            // Act
            await usersService.login(undefined, email, password);

            // Assert
            expect(verifyPasswordMock).toHaveBeenCalledWith(password, user.passwordHash);
        });

        it('should call generateToken with the correct arguments', async () => {
            // Arrange
            usersRepository.findByEmail = jest.fn().mockResolvedValue(user);

            // Act
            await usersService.login(undefined, email, password);

            // Assert
            expect(generateTokenMock).toHaveBeenCalledWith(user);
        });

        it('should throw an error when neither email nor username is provided', async () => {
            // Arrange
            email = undefined as any;
            username = undefined as any;

            let error: Error | undefined;

            // Act
            try {
                await usersService.login(username, email, password);
            } catch (e) {
                error = e as Error;
            }

            // Assert
            expect(error).toBeDefined();
            expect(error!.message).toBe('Invalid login data');
        });
    });
});
