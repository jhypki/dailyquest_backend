import { validateRegisterData } from '../../../src/utils/validations/users/validate-register-data';
import { BadRequestError } from '../../../src/utils/errors/bad-request-error';

describe('validateRegisterData', () => {
    let username: string;
    let email: string;
    let password: string;

    beforeEach(() => {
        username = 'test';
        email = 'test@example.com';
        password = 'password';
    });

    it('should not throw error if correct data is provided', async () => {
        // Act & Assert
        await expect(validateRegisterData(username, email, password)).resolves.not.toThrow();
    });

    it('should throw error if no username is provided', async () => {
        // Arrange
        username = undefined as any;
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateRegisterData(username, email, password);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Act & Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid user data');
        expect(error!.errors).toHaveLength(1);
        expect(error!.errors[0].field).toBe('username');
        expect(error!.errors[0].message).toBe('Username is required');
    });

    it('should throw error if no email is provided', async () => {
        // Arrange
        email = undefined as any;
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateRegisterData(username, email, password);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Act & Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid user data');
        expect(error!.errors).toHaveLength(1);
        expect(error!.errors[0].field).toBe('email');
        expect(error!.errors[0].message).toBe('Email is required');
    });

    it('should throw error if no password is provided', async () => {
        // Arrange
        password = undefined as any;
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateRegisterData(username, email, password);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Act & Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid user data');
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
            await validateRegisterData(username, email, password);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Act & Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid user data');
        expect(error!.errors).toHaveLength(1);
        expect(error!.errors[0].field).toBe('email');
        expect(error!.errors[0].message).toBe('Invalid email format');
    });

    it('should throw an error if password is too short', async () => {
        // Arrange
        password = 'short12';
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateRegisterData(username, email, password);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Act & Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid user data');
        expect(error!.errors).toHaveLength(1);
        expect(error!.errors[0].field).toBe('password');
        expect(error!.errors[0].message).toBe('Password must be at least 8 characters long');
    });

    it('should throw an error if email and password are invalid', async () => {
        // Arrange
        email = 'invalidEmail';
        password = 'short12';
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateRegisterData(username, email, password);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Act & Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid user data');
        expect(error!.errors).toHaveLength(2);
        expect(error!.errors[0].field).toBe('email');
        expect(error!.errors[0].message).toBe('Invalid email format');
        expect(error!.errors[1].field).toBe('password');
        expect(error!.errors[1].message).toBe('Password must be at least 8 characters long');
    });

    it('should throw an error if username and password are invalid', async () => {
        // Arrange
        username = '';
        password = 'short12';
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateRegisterData(username, email, password);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Act & Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid user data');
        expect(error!.errors).toHaveLength(2);
        expect(error!.errors[0].field).toBe('username');
        expect(error!.errors[0].message).toBe('Username is required');
        expect(error!.errors[1].field).toBe('password');
        expect(error!.errors[1].message).toBe('Password must be at least 8 characters long');
    });

    it('should throw an error if username and email are invalid', async () => {
        // Arrange
        username = '';
        email = 'invalidEmail';
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateRegisterData(username, email, password);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Act & Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid user data');
        expect(error!.errors).toHaveLength(2);
        expect(error!.errors[0].field).toBe('username');
        expect(error!.errors[0].message).toBe('Username is required');
        expect(error!.errors[1].field).toBe('email');
        expect(error!.errors[1].message).toBe('Invalid email format');
    });

    it('should throw an error if all fields are invalid', async () => {
        // Arrange
        username = '';
        email = 'invalidEmail';
        password = 'short12';
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateRegisterData(username, email, password);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Act & Assert
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error!.message).toBe('Invalid user data');
        expect(error!.errors).toHaveLength(3);
        expect(error!.errors[0].field).toBe('username');
        expect(error!.errors[0].message).toBe('Username is required');
        expect(error!.errors[1].field).toBe('email');
        expect(error!.errors[1].message).toBe('Invalid email format');
        expect(error!.errors[2].field).toBe('password');
        expect(error!.errors[2].message).toBe('Password must be at least 8 characters long');
    });
});
