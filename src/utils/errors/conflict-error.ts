import { CustomError } from './custom-error';

export class ConflictError extends CustomError {
    statusCode = 409;

    constructor(message: string, errors: { field: string | undefined; message: string }[] = []) {
        super(message, errors);
        if (errors.length === 0) {
            this.errors.push({ field: undefined, message: message });
        }
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
