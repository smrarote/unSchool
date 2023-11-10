import { Request, Response, NextFunction, RequestHandler } from 'express';

// type for the controller
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default (fn: AsyncFunction): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    fn(req, res, next).catch((error): void => {
      next(error);
    });
  };
};
