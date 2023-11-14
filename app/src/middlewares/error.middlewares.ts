import winLogger from '../utils/winston.util.js';
import { genError } from '../utils/error.util.js';
import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: genError, req: Request, res: Response, next: NextFunction): void => {
  const errStatus = err.status || 500;
  const errMsg = err.message || 'Something went wrong';
  const errStack = err.stack || {};
  const errBody = err.body;
  const errName = err.name || '';
  const errSuccess = err.success;
  winLogger.error(
    `url : ${req.url} body : ${JSON.stringify(req.body)} query : ${JSON.stringify(
      req.query,
    )} name : ${errName} message : ${errMsg} tack :  ${errStack}`,
  );
  res.status(errStatus).json({
    success: errSuccess,
    status: errStatus,
    message: errMsg,
    name: errName,
    error: errBody,
    stack: process.env.NODE_ENV === 'dev' ? errStack : {},
  });
};

export default errorHandler;
