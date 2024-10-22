import { Router } from 'express';
import authenticateController from '../controllers/authenticate-controller';

export const authenticateRoutes = Router();

authenticateRoutes.post('/register', authenticateController.register);
authenticateRoutes.post('/login', authenticateController.login);
