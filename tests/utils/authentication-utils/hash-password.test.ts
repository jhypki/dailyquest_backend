import { hashPassword } from '../../../src/utils/authentication-utils/hash-password';

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword')
}));

describe('hashPassword', () => {
    it('should hash password', async () => {
        // Arrange
        const password = 'password';

        // Act
        const result = await hashPassword(password);

        // Assert
        expect(result).toBe('hashedPassword');
    });

    it('should call bcrypt.hash with correct arguments', async () => {
        // Arrange
        const password = 'password';

        // Act
        await hashPassword(password);

        // Assert
        expect(require('bcrypt').hash).toHaveBeenCalledWith(password, 10);
    });

    it('should throw error if bcrypt.hash throws error', async () => {
        // Arrange
        const password = 'password';
        const error = new Error('Test error');
        require('bcrypt').hash = jest.fn().mockRejectedValue(error);

        // Act & Assert
        await expect(hashPassword(password)).rejects.toThrow(error);
    });
});
