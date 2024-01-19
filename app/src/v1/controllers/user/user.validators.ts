// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { body, query } from 'express-validator';
export const signIn = [
  body('username').exists().withMessage('username required').trim().notEmpty().withMessage('Username required'),
  body('password').exists().withMessage('password required').trim().notEmpty().withMessage('Password is required'),
];

// username, first_name, last_name, email, mobile, password, socia
export const signUp = [
  body('username').exists().withMessage('username required').trim().notEmpty().withMessage('Username required'),
  body('password').exists().withMessage('password required').trim().notEmpty().withMessage('Password is required').isLength({
    min: 3,
    max: 50,
  }),
  body('first_name')
    .exists()
    .withMessage('First Name required')
    .trim()
    .notEmpty()
    .withMessage('First Name is required')
    .isAlpha()
    .withMessage('Only Characters Allowed'),
  body('last_name').optional().trim().isAlpha(),
  body('email').isEmail().withMessage('Invalid Email'),
  body('mobile')
    .optional()
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .matches(/^[789]\d{9}$/)
    .withMessage('Invalid mobile'),
];
