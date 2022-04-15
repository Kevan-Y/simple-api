import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';

import { logger } from './logger';
import { router } from './routes';

const app = express();

app.use(pinoHttp({ logger }));

app.use(helmet());

app.use(cors());

app.use('/', router);

app.use((req: Request, res: Response, next: NextFunction) => {
  next({
    status: 'error',
    error: {
      code: 404,
      message: 'Not Found',
    },
  });
});

app.use((err: any, req: Request, res: Response) => {
  const status = err?.error?.code || 500;
  const message = err?.error?.message || 'unable to process request';

  if (status > 499) {
    logger.error({ err }, `Error processing request`);
  }

  res.status(status).json({
    status: 'error',
    error: {
      message,
      code: status,
    },
  });
});

export { app };
