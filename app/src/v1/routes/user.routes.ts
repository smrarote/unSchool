import { Router } from 'express';
import * as userController from '../controllers/user/user.controller.js';
import * as userValidators from '../controllers/user/user.validators.js';
import { validationHandler } from '../common.imports.js';
const router = Router();

// Authentication
router.route('/signin').post(userValidators.signIn, validationHandler, userController.signIn);
router.route('/signup').post(userController.signUp);
// activity

export default router;
