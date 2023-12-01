// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { body, query } from 'express-validator';
export const signIn = [
  body('username').exists().withMessage('username required').trim().notEmpty().withMessage('Username required'),
  body('password').exists().withMessage('password required').trim().notEmpty().withMessage('Password is required'),
];
