import { Request, Response, NextFunction } from 'express';
import GenError from '../utils/error.util.js';
import { statusCodes, errorNames } from '../config/constants/statusErrors.js';
import { validationResult } from 'express-validator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const validationHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const validationerror = validationResult(req);
  if (!validationerror.isEmpty()) {
    return next(new GenError('validation error', statusCodes.PARAMETER_VALIDATION, validationerror.array(), null, errorNames.validation));
  }
  next();
};

export default validationHandler;
