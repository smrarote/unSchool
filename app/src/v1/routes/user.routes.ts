import { Router } from 'express';
import * as userController from '../controllers/user/user.controller.js';
const router = Router();

// Authentication
router.route('/signin').post(userController.signIn);
router.route('/signup').post(userController.signUp);
// activity

export default router;
