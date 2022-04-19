import { Request, Response } from 'express';
import { createSuccessResponse } from '../../utils/response';

export const pong = (req: Request, res: Response) => {
  res.status(200).json(createSuccessResponse({ message: 'pong testing' }));
};
