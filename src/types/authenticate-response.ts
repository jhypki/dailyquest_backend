import { UserResponseData } from './user-response-data';

export interface AuthenticateResponse {
    token: string;
    user: UserResponseData;
}
