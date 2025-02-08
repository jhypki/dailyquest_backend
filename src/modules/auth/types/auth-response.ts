import { UserResponseData } from '../../users/types/user-response-data';

export interface AuthResponse {
    token: string;
    user: UserResponseData;
}
