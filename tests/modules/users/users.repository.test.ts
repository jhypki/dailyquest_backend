import usersRepository from '../../../src/modules/users/users.repository';
import prisma from '../../../src/config/prisma/prisma';
import { User } from '@prisma/client';

describe('UsersRepository', () => {
    const users: User[] = [
        {
            id: '1',
            username: 'user1',
            email: 'email@email.com',
            passwordHash: 'password',
            createdAt: new Date(),
            firstName: 'First',
            lastName: 'Last',
            picture: 'picture'
        },
        {
            id: '2',
            username: 'user2',
            email: 'email2@email.com',
            passwordHash: 'password',
            createdAt: new Date(),
            firstName: 'First',
            lastName: 'Last',
            picture: 'picture'
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        prisma.user.findMany = jest.fn().mockResolvedValue(users);
        prisma.user.findUnique = jest.fn().mockResolvedValue(users[0]);
        prisma.user.create = jest.fn().mockResolvedValue(users[0]);
        prisma.user.update = jest.fn().mockResolvedValue(users[0]);
        prisma.user.delete = jest.fn().mockResolvedValue(users[0]);

        prisma.task.deleteMany = jest.fn().mockResolvedValue(Promise.resolve({ count: 1 }));
        prisma.stats.delete = jest.fn().mockResolvedValue(Promise.resolve({}));
    });


    describe('getUsers', () => {
        it('should return all users', async () => {
            // Act
            const result = await usersRepository.getUsers();

            // Assert
            expect(result).toEqual(users);
        });

        it('should return empty array if no users are found', async () => {
            // Arrange
            prisma.user.findMany = jest.fn().mockResolvedValueOnce([]);

            // Act
            const result = await usersRepository.getUsers();

            // Assert
            expect(result).toEqual([]);
        });
    });

    describe('findById', () => {
        it('should return a user by id', async () => {
            // Act
            const result = await usersRepository.findById('1');

            // Assert
            expect(result).toEqual(users[0]);
        });

        it('should return null if no user is found', async () => {
            // Arrange
            prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);

            // Act
            const result = await usersRepository.findById('3');

            // Assert
            expect(result).toBeNull();
        });
    });

    describe('create', () => {
        it('should create a user', async () => {
            // Act
            const result = await usersRepository.create(users[0]);

            // Assert
            expect(result).toEqual(users[0]);
        });

        it('should return null if no user is created', async () => {
            // Arrange
            prisma.user.create = jest.fn().mockResolvedValueOnce(null);

            // Act
            const result = await usersRepository.create(users[0]);

            // Assert
            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it('should update a user', async () => {
            // Act
            const result = await usersRepository.update('1', users[0]);

            // Assert
            expect(result).toEqual(users[0]);
        });

        it('should return null if no user is updated', async () => {
            // Arrange
            prisma.user.update = jest.fn().mockResolvedValueOnce(null);

            // Act
            const result = await usersRepository.update('1', users[0]);

            // Assert
            expect(result).toBeNull();
        });
    });

    // describe('delete', () => {
    //     it('should delete a user and related data', async () => {
    //         // Arrange
    //         const userId = '1';
    //         prisma.task.deleteMany = jest.fn().mockResolvedValue({ count: 1 });
    //         prisma.stats.delete = jest.fn().mockResolvedValue({ deleted: true });
    //         prisma.user.delete = jest.fn().mockResolvedValue(users[0]);
    //
    //         // Act
    //         await usersRepository.delete(userId);
    //
    //         // Assert
    //         expect(prisma.task.deleteMany).toHaveBeenCalledWith({ where: { userId } });
    //         expect(prisma.stats.delete).toHaveBeenCalledWith({ where: { userId } });
    //         expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: userId } });
    //     });
    //
    //     it('should handle no user deleted scenario', async () => {
    //         // Arrange
    //         const userId = '1';
    //         prisma.task.deleteMany = jest.fn().mockResolvedValue({});
    //         prisma.stats.delete = jest.fn().mockResolvedValue({});
    //         prisma.user.delete = jest.fn().mockResolvedValue(null);
    //
    //         // Act
    //         await usersRepository.delete(userId);
    //
    //         // Assert
    //         expect(prisma.task.deleteMany).toHaveBeenCalledWith({ where: { userId } });
    //         expect(prisma.stats.delete).toHaveBeenCalledWith({ where: { userId } });
    //         expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: userId } });
    //     });
    // });

    describe('findByUsername', () => {
        it('should return a user by username', async () => {
            // Act
            const result = await usersRepository.findByUsername('user1');

            // Assert
            expect(result).toEqual(users[0]);
        });

        it('should return null if no user is found', async () => {
            // Arrange
            prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);

            // Act
            const result = await usersRepository.findByUsername('user3');

            // Assert
            expect(result).toBeNull();
        });
    });

    describe('findByEmail', () => {
        it('should return a user by email', async () => {
            // Act
            const result = await usersRepository.findByEmail('email@email.com');

            // Assert
            expect(result).toEqual(users[0]);
        });

        it('should return null if no user is found', async () => {
            // Arrange
            prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);

            // Act
            const result = await usersRepository.findByEmail('email@email.com');

            // Assert
            expect(result).toBeNull();
        });
    });
});
