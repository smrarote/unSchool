import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { catchAsync, GenError, winLogger, errorNames, statusCodes, response, requestHandler } from '../../common.imports.js';

export const signIn = requestHandler(async (_req: Request, _res: Response): Promise<void> => {
  response(_res, {
    code: statusCodes.SUCCESS,
    success: true,
    message: 'signin',
  });
});

export const signUp = requestHandler(async (_req: Request, _res: Response): Promise<void> => {
  response(_res, {
    code: statusCodes.SUCCESS,
    success: true,
    message: 'signup',
  });
});
