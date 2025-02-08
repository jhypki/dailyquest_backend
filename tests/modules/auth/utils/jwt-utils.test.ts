import { User } from '@prisma/client';
import { generateToken, verifyToken } from '../../../../src/modules/auth/utils/jwt-utils';
import jwt from 'jsonwebtoken';

describe('JWT Utils', () => {
    let user: User;
    let signMock: jest.SpyInstance;
    let verifyMock: jest.SpyInstance;

    beforeEach(() => {
        user = {
            id: 'id',
            username: 'test',
            email: 'test@example.com',
            passwordHash: 'password',
            picture: 'picture',
            firstName: 'first',
            lastName: 'last',
            createdAt: new Date()
        };

        signMock = jest.spyOn(jwt, 'sign').mockImplementation(() => 'token');
        verifyMock = jest
            .spyOn(jwt, 'verify')
            .mockImplementation((token, secret, cb) =>
                (cb as jwt.VerifyCallback)(null, { id: 1, username: 'test', email: 'test@example.com' })
            );
    });

    describe('generateToken', () => {
        it('should return a token', () => {
            // Act
            const token = generateToken(user);

            // Assert
            expect(token).toBe('token');
        });

        it('should call jwt.sign with correct payload', () => {
            // Act
            generateToken(user);

            // Assert
            expect(signMock).toHaveBeenCalledWith(
                {
                    id: 'id',
                    username: 'test',
                    email: 'test@example.com'
                },
                'your_jwt_secret_key',
                { expiresIn: '30d' }
            );
        });
    });

    describe('verifyToken', () => {
        it('should return a user', async () => {
            // Act
            const decodedUser = await verifyToken('token');

            // Assert
            expect(decodedUser).toEqual({ id: 1, username: 'test', email: 'test@example.com' });
        });

        it('should call jwt.verify with correct token', async () => {
            // Act
            await verifyToken('token');

            // Assert
            expect(verifyMock).toHaveBeenCalledWith('token', 'your_jwt_secret_key', expect.any(Function));
        });

        it('should throw an error if jwt.verify throws an error', async () => {
            // Arrange
            (require('jsonwebtoken').verify as jest.Mock).mockImplementationOnce((token, secret, cb) =>
                cb(new Error())
            );

            // Act & Assert
            await expect(verifyToken('token')).rejects.toThrow();
        });
    });
});
