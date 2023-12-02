import { Request, Response, NextFunction } from 'express';

// type for the controller
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const catchAsync = (fn: AsyncFunction): AsyncFunction => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
};

export default catchAsync;
