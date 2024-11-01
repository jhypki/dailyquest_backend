import { verifyPassword } from '../../../src/utils/authentication-utils/verify-password';

describe('verifyPassword', () => {
    let compareMock: jest.SpyInstance;

    beforeEach(() => {
        compareMock = jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(true);
    });

    it('should return true if passwords match', async () => {
        // Arrange
        const password = 'password';
        const hashedPassword = 'hashedPassword';

        // Act
        const result = await verifyPassword(password, hashedPassword);

        // Assert
        expect(result).toBe(true);
    });

    it('should call bcrypt.compare with correct arguments', async () => {
        // Arrange
        const password = 'password';
        const hashedPassword = 'hashedPassword';

        // Act
        await verifyPassword(password, hashedPassword);

        // Assert
        expect(compareMock).toHaveBeenCalledWith(password, hashedPassword);
    });

    it('should return false if passwords do not match', async () => {
        // Arrange
        const password = 'password';
        const hashedPassword = 'hashedPassword';
        compareMock.mockResolvedValue(false);

        // Act
        const result = await verifyPassword(password, hashedPassword);

        // Assert
        expect(result).toBe(false);
    });

    it('should throw error if bcrypt.compare throws error', async () => {
        // Arrange
        const password = 'password';
        const hashedPassword = 'hashedPassword';
        const error = new Error('Test error');
        compareMock.mockRejectedValue(error);

        // Act & Assert
        await expect(verifyPassword(password, hashedPassword)).rejects.toThrow(error);
    });
});
