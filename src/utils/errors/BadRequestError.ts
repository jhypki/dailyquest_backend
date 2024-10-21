// src/utils/errors/BadRequestError.ts

export class BadRequestError extends Error {
    statusCode: number;
    errors: { field: string | undefined; message: string }[];

    constructor(
        message: string,
        errors: { field: string | undefined; message: string }[] = []
    ) {
        super(message);
        this.statusCode = 400;
        this.errors = errors;

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
