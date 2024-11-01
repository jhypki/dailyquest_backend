import * as Yup from 'yup';
import { BadRequestError } from '../../errors/bad-request-error';

const registerSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long')
});

export const validateRegisterData = async (username: string, email: string, password: string): Promise<void> => {
    try {
        await registerSchema.validate({ username, email, password }, { abortEarly: false });
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
