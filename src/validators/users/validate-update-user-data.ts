import * as Yup from 'yup';
import { BadRequestError } from '../../errors/bad-request-error';
import { UpdateUserRequest } from '../../types/requests/update-user-request';

const updateUserSchema = Yup.object()
    .shape({
        username: Yup.string(),
        email: Yup.string().email('Invalid email format'),
        password: Yup.string().min(8, 'Password must be at least 8 characters long'),
        picture: Yup.string(),
        firstName: Yup.string(),
        lastName: Yup.string()
    })
    .test('at-least-one', 'At least one field must be provided', function (value) {
        return !!(
            value.username ||
            value.email ||
            value.password ||
            value.picture ||
            value.firstName ||
            value.lastName
        );
    });

export const validateUpdateUserData = async (data: UpdateUserRequest): Promise<void> => {
    try {
        await updateUserSchema.validate(data, { abortEarly: false });
    } catch (validationError) {
        if (validationError instanceof Yup.ValidationError) {
            const errors = validationError.inner.map((err) => ({
                field: err.path,
                message: err.message
            }));
            throw new BadRequestError('Invalid user data', errors);
        }
    }
};
