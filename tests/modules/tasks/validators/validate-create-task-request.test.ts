import { validateCreateTaskRequest } from '../../../../src/modules/tasks/validators/validate-create-task-request';
import { CreateTaskRequest } from '../../../../src/modules/tasks/types/create-task-request';
import { BadRequestError } from '../../../../src/common/errors/bad-request-error';

describe('Validate Create Task Request', () => {
    let createTaskRequest: CreateTaskRequest;

    beforeEach(() => {
        createTaskRequest = {
            title: 'task',
            description: 'description',
            category: 'personal_development',
            negativeTask: false,
            difficulty: 0.5
        };
    });

    it('should not throw an error if request is valid', async () => {
        // Act and Assert
        await expect(validateCreateTaskRequest(createTaskRequest)).resolves.not.toThrow();
    });

    it.each([
        ['title', '', 'Title is required'],
        ['description', '', 'Description is required'],
        ['category', '', 'Category is required'],
        ['negativeTask', undefined, 'Negative task is required'],
        ['difficulty', undefined, 'Difficulty is required']
    ])('should throw an error if %s is missing', async (field, value, message) => {
        // Arrange
        (createTaskRequest as any)[field] = value;
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateCreateTaskRequest(createTaskRequest);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Assert
        expect(error).toBeInstanceOf(Error);
        expect(error!.errors[0].field).toBe(field);
        expect(error!.errors[0].message).toBe(message);
    });

    it.each([
        [-1, 'difficulty must be greater than or equal to 0'],
        [2, 'difficulty must be less than or equal to 1']
    ])('should throw an error if difficulty is invalid', async (difficulty, message) => {
        // Arrange
        createTaskRequest.difficulty = difficulty;
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateCreateTaskRequest(createTaskRequest);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Assert
        expect(error).toBeInstanceOf(Error);
        expect(error!.errors[0].message).toBe(message);
    });

    it('should throw an error if difficulty is not a number', async () => {
        // Arrange
        createTaskRequest.difficulty = 'invalid' as any;
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateCreateTaskRequest(createTaskRequest);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Assert
        expect(error).toBeInstanceOf(Error);
        expect(error!.errors[0].message).toBe('difficulty must be a `number` type, but the final value was: `NaN` (cast from the value `"invalid"`).');
    });

    it('should throw an error if request is invalid', async () => {
        // Arrange
        createTaskRequest = {} as any;
        let error: BadRequestError | undefined;

        // Act
        try {
            await validateCreateTaskRequest(createTaskRequest);
        } catch (e: any) {
            error = e as BadRequestError;
        }

        // Assert
        expect(error).toBeInstanceOf(Error);
        expect(error!.message).toBe('Invalid task data');
        expect(error!.errors).toHaveLength(5);
    });
});