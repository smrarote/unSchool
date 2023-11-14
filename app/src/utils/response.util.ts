import { Response } from 'express';
type responsBody = {
  code: number;
  success: true | false;
  message: string;
  data?: object | undefined;
};
export default (res: Response, response: responsBody): Response => {
  return res.status(response.code).json(response);
};
