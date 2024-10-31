import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    if (req.body) {
        console.log(`Request Body: ${JSON.stringify(req.body)}`);
    }

    const originalJson = res.json;
    const originalSend = res.send;

    res.json = function (body: unknown) {
        res.locals.data = body;
        return originalJson.call(this, body);
    };

    res.send = function (body: unknown) {
        res.locals.data = body;
        return originalSend.call(this, body);
    };

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(
            `[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} ${
                res.statusMessage
            }; ${duration} ms`
        );

        if (res.locals.data) {
            console.log(`Response Body: ${JSON.stringify(res.locals.data)}`);
        }
    });

    next();
};

export default requestLogger;
