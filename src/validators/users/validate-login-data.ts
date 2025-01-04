import * as Yup from 'yup';
import { BadRequestError } from '../../errors/bad-request-error';

const loginSchema = Yup.object()
    .shape({
        username: Yup.string(),
        email: Yup.string().email('Invalid email format'),
        password: Yup.string().required('Password is required')
    })
    .test('at-least-one', 'Either email or username is required', function (value) {
        return !!(value.username || value.email);
    });

//TODO move validation unit tests to separate file from service tests
export const validateLoginData = async (
    username: string | undefined,
    email: string | undefined,
    password: string
): Promise<void> => {
    try {
        await loginSchema.validate({ username, email, password }, { abortEarly: false });
    } catch (validationError) {
        if (validationError instanceof Yup.ValidationError) {
            const errors = validationError.inner.map((err) => ({
                field: err.path,
                message: err.message
            }));
            throw new BadRequestError('Invalid login data', errors);
        }
    }
};
