import { Request, Response, NextFunction } from 'express';
import GenError from '../utils/error.util.js';
import { statusCodes, errorNames } from '../config/constants/statusErrors.js';
import ReqAuth from '../services/auth/request.auth.js';
import winLogger from '../utils/winston.util.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reqValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // from header read authentication
  const authHeader = req.headers['Authorization'] as string;
  if (!authHeader) {
    return next(new GenError('validation error', statusCodes.UNOTHORIZED, {}, null, errorNames.unauth));
  }

  const token = authHeader.split(' ')[1];
  // verify the token
  const decode = new ReqAuth({ token }).validate();
  if (!decode) {
    winLogger.info('JWT token Expired');
    return next(new GenError('validation error', statusCodes.UNOTHORIZED, {}, null, errorNames.unauth));
  }
  req.body.auth = { ...req.body?.auth, token, decode };

  next();
};

export default reqValidation;
