import { Router } from 'express';

const router = Router();

// user routes
import userRoutes from './routes/user.routes.js';
router.use('/user', userRoutes);

export default router;
