import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';

import { logger } from './logger';
import { router } from './routes';
import { createErrorResponse } from './utils/response';

const app = express();

app.use(pinoHttp({ logger }));

app.use(helmet());

app.use(cors());

app.use('/', router);

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error not found request`);

  next(createErrorResponse(404, 'Not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err?.error?.code || err?.status || 500;
  const message = err?.error?.message || err?.message || 'unable to process request';
  logger.error(`here`);

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
