import { validateLoginData } from '../../../../src/modules/auth/validators/validate-login-data';
import { BadRequestError } from '../../../../src/common/errors/bad-request-error';

describe('validateLoginData', () => {
    let username: string | undefined;
    let email: string | undefined;
    let password: string;

    beforeEach(() => {
        username = 'test';
        email = 'test@examepl.com';
        password = 'password';
    });

    it('should not throw error if correct data is provided', async () => {
        // Act & Assert
        await expect(validateLoginData(username, email, password)).resolves.not.toThrow();
    });

    it('should not throw error if only username is provided', async () => {
        // Arrange
        email = undefined;

        // Act & Assert
        await expect(validateLoginData(username, email, password)).resolves.not.toThrow();
    });

    it('should not throw error if only email is provided', async () => {
        // Arrange
        username = undefined;

        // Act & Assert
        await expect(validateLoginData(username, email, password)).resolves.not.toThrow();
    });

    it('should throw error if no password is provided', async () => {
        // Arrange
        password = undefined as any;
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateLoginData(username, email, password);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid login data');
        expect(error!.errors).toHaveLength(1);
        expect(error!.errors[0].field).toBe('password');
        expect(error!.errors[0].message).toBe('Password is required');
    });

    it('should throw an error if email is invalid', async () => {
        // Arrange
        email = 'invalidEmail';
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateLoginData(username, email, password);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid login data');
        expect(error!.errors).toHaveLength(1);
        expect(error!.errors[0].field).toBe('email');
        expect(error!.errors[0].message).toBe('Invalid email format');
    });

    it('should throw an error if both email and username are missing', async () => {
        // Arrange
        username = undefined;
        email = undefined;
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateLoginData(username, email, password);
        } catch (e) {
            error = e as BadRequestError;
        }

        // Assert
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid login data');
        expect(error!.errors).toHaveLength(1);
        expect(error!.errors[0].message).toBe('Either email or username is required');
    });
});
