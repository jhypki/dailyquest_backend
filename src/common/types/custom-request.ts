import { BasicUserData } from './basic-user-data';
import { Request } from 'express';

export interface CustomRequest extends Request {
    user?: BasicUserData;
}
