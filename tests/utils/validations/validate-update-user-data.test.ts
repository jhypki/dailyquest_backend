import { UpdateUserRequest } from '../../../src/modules/users/types/update-user-request';
import { BadRequestError } from '../../../src/utils/errors/bad-request-error';
import { validateUpdateUserData } from '../../../src/modules/users/validators/validate-update-user-data';

describe('validateUpdateUserData', () => {
    let data: UpdateUserRequest;

    beforeEach(() => {
        data = {};
    });

    it('should not throw error if correct data is provided', async () => {
        // Arrange
        data = {
            username: 'test',
            email: 'test@example.com',
            password: 'password',
            picture: 'picture',
            firstName: 'firstName',
            lastName: 'lastName'
        };

        // Act & Assert
        await expect(validateUpdateUserData(data)).resolves.not.toThrow();
    });

    it.each(['username', 'picture', 'firstName', 'lastName'])(
        'should not throw error if only %s is provided',
        async (field) => {
            // Arrange
            data = { [field]: 'test' };

            // Act & Assert
            await expect(validateUpdateUserData(data)).resolves.not.toThrow();
        }
    );

    it('should not throw an error if only password is provided', async () => {
        // Arrange
        data = { password: 'password' };

        // Act & Assert
        await expect(validateUpdateUserData(data)).resolves.not.toThrow();
    });

    it('should not throw an error if only email is provided', async () => {
        // Arrange
        data = { email: 'test@example.com' };

        // Act & Assert
        await expect(validateUpdateUserData(data)).resolves.not.toThrow();
    });

    it('should throw error if no data is provided', async () => {
        // Arrange
        data = {};
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateUpdateUserData(data);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid user data');
        expect(error!.errors).toHaveLength(1);
        expect(error!.errors[0].message).toBe('At least one field must be provided');
    });

    it('should throw error if email is invalid', async () => {
        // Arrange
        data = { email: 'invalidEmail' };
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateUpdateUserData(data);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid user data');
        expect(error!.errors).toHaveLength(1);
        expect(error!.errors[0].field).toBe('email');
        expect(error!.errors[0].message).toBe('Invalid email format');
    });

    it('should throw error if password is too short', async () => {
        // Arrange
        data = { password: 'pass' };
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateUpdateUserData(data);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid user data');
        expect(error!.errors).toHaveLength(1);
        expect(error!.errors[0].field).toBe('password');
        expect(error!.errors[0].message).toBe('Password must be at least 8 characters long');
    });
});
