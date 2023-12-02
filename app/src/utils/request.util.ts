import { Request, Response, NextFunction } from 'express';
import catchAsync from './catchAsync.util.js';
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;
type requestFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default (handler: requestFunction): AsyncFunction => {
  return catchAsync(async (_req: Request, _res: Response, _next: NextFunction): Promise<void> => {
    await handler(_req, _res, _next);
  });
};
