import express, { Request, Response } from 'express';
import { version, author } from '../../package.json';
import { createSuccessResponse } from '../utils/response';
import { router as routerAPI } from './api';

const router = express.Router();

router.use(`/v1`, routerAPI);

// Healthcheck route
router.get('/', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-cache');

  res.status(200).json(createSuccessResponse({ version, author }));
});

export { router };
