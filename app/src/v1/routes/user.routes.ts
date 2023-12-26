import { Router } from 'express';
import * as userController from '../controllers/user/user.controller.js';
import * as userValidators from '../controllers/user/user.validators.js';
import { validationHandler, reqValidation } from '../common.imports.js';
const router = Router();

// Authentication
router.route('/signin').post(userValidators.signIn, validationHandler, userController.signIn);
router.route('/signup').post(userValidators.signUp, validationHandler, userController.signUp);
router.route('/protected').get(reqValidation, (req, res) => {
  return res.status(200).json({ msg: 'protectd validated', data: req.body.auth });
});
// activity

export default router;
