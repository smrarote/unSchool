import winLogger from '../utils/winston.util.js';
import { genError } from '../utils/error.util.js';
import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: genError, req: Request, res: Response, next: NextFunction): void => {
  const errCode = err.code || 500;
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
  res.status(errCode).json({
    success: errSuccess,
    code: errCode,
    message: errMsg,
    name: errName,
    body: errBody,
    stack: process.env.NODE_ENV === 'dev' ? errStack : '',
  });
};

export default errorHandler;
