export interface ErrorResponse {
    message: string;
    statusCode: number;
    errors?: { field: string | undefined; message: string }[];
}
