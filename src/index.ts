import { authenticateRoutes } from './routes/authenticate-routes';
import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { usersRoutes } from './routes';
import errorHandler from './middlewares/error-handler';
import logger from './middlewares/logger';
import authenticateToken from './middlewares/authenticate-token';

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

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not Found',
        statusCode: 404
    });
});

app.use(errorHandler);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
