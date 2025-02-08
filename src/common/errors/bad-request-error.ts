import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(message: string, errors: { field: string | undefined; message: string }[] = []) {
        super(message, errors);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
