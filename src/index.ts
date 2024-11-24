import { authenticateRoutes } from './routes/authenticate-routes';
import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { usersRoutes } from './routes/users-routes';
import errorHandler from './middlewares/error-handler';
import logger from './middlewares/logger';
import authenticateToken from './middlewares/authenticate-token';
import { tasksRoutes } from './routes/tasks-routes';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(logger);

app.use(
    authenticateToken.unless({
        path: [
            { url: '/authenticate', methods: ['GET', 'POST'] },
            { url: '/authenticate/login', methods: ['POST'] },
            { url: '/authenticate/register', methods: ['POST'] }
        ]
    })
);

app.use('/users', usersRoutes);
app.use('/authenticate', authenticateRoutes);
app.use('/tasks', tasksRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: 'Not Found',
        statusCode: 404
    });
    next();
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
