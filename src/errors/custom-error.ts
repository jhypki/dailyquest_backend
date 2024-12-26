export abstract class CustomError extends Error {
    abstract statusCode: number;
    errors: { field: string | undefined; message: string }[];

    constructor(message: string, errors: { field: string | undefined; message: string }[] = []) {
        super(message);
        this.errors = errors;

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    serializeErrors() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            errors: this.errors.length > 0 ? this.errors : undefined
        };
    }
}
