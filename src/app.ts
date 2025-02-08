import express, { Express } from 'express';
import dotenv from 'dotenv';
import { authRoutes } from './modules/auth/auth.routes';
import { usersRoutes } from './modules/users/users.routes';
import { tasksRoutes } from './modules/tasks/tasks.routes';
import errorHandler from './common/middlewares/error-handler';
import notFoundHandler from './common/middlewares/not-found-handler';
import authenticateToken from './common/middlewares/authenticate-token';
import logger from './common/middlewares/logger';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app: Express = express();

app.use(express.json());

app.use(logger);

app.use(
    authenticateToken.unless({
        path: [
            { url: '/auth', methods: ['GET', 'POST'] },
            { url: '/auth/login', methods: ['POST'] },
            { url: '/auth/register', methods: ['POST'] }
        ]
    })
);

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

// app.use(notFoundHandler);

app.use(errorHandler);

export { app };