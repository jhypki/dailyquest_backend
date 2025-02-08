import { UpdateUserStatsRequest } from '../../users/types/update-user-stats-request';
import * as Yup from 'yup';
import { BadRequestError } from '../../../common/errors/bad-request-error';

const updateUserStatsSchema = Yup.object()
    .shape({
        strength: Yup.number().min(0, 'Strength must be a positive number'),
        dexterity: Yup.number().min(0, 'Dexterity must be a positive number'),
        intelligence: Yup.number().min(0, 'Intelligence must be a positive number'),
        endurance: Yup.number().min(0, 'Endurance must be a positive number'),
        charisma: Yup.number().min(0, 'Charisma must be a positive number'),
        vitality: Yup.number().min(0, 'Vitality must be a positive number')
    })
    .test('at-least-one', 'At least one field must be provided', function (value) {
        return !!(
            value.strength ||
            value.dexterity ||
            value.intelligence ||
            value.endurance ||
            value.charisma ||
            value.vitality
        );
    });

export const validateUpdateStatsData = async (data: UpdateUserStatsRequest): Promise<void> => {
    try {
        await updateUserStatsSchema.validate(data, { abortEarly: false });
    } catch (validationError) {
        if (validationError instanceof Yup.ValidationError) {
            const errors = validationError.inner.map((err) => ({
                field: err.path,
                message: err.message
            }));
            throw new BadRequestError('Invalid stats data', errors);
        }
    }
};
