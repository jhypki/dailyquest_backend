import { authenticateRoutes } from './routes/authenticate-routes';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { userRoutes } from './routes';
import errorHandler from './middlewares/error-handler';
import logger from './middlewares/logger';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.use('/users', userRoutes);
app.use('/authenticate', authenticateRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not Found',
        statusCode: 404
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
