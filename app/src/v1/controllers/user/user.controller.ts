import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { catchAsync, GenError, winLogger, errorNames, statusCodes, response } from '../../common.imports.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const signIn = catchAsync(async (_req: Request, _res: Response, _next: NextFunction): Promise<void> => {
  response(_res, {
    code: statusCodes.SUCCESS,
    success: true,
    message: 'hey',
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const signUp = catchAsync(async (_req: Request, _res: Response, _next: NextFunction): Promise<void> => {
  response(_res, {
    code: statusCodes.SUCCESS,
    success: true,
    message: 'hey',
  });
});
