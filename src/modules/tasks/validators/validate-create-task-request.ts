import * as Yup from 'yup';
import { CreateTaskRequest } from '../types/create-task-request';
import { BadRequestError } from '../../../common/errors/bad-request-error';

const createTaskSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required'),
    negativeTask: Yup.boolean().required('Negative task is required'),
    difficulty: Yup.number().required('Difficulty is required').min(0).max(1)
});

export const validateCreateTaskRequest = async (request: CreateTaskRequest): Promise<void> => {
    try {
        await createTaskSchema.validate(request, { abortEarly: false });
    } catch (validationError) {
        if (validationError instanceof Yup.ValidationError) {
            const errors = validationError.inner.map((err) => ({
                field: err.path,
                message: err.message
            }));
            throw new BadRequestError('Invalid task data', errors);
        }
    }
};
