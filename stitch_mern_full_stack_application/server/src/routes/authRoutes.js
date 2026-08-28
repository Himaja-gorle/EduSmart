import express from 'express';
import { loginUser, registerUser, getProfile } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', requireAuth, getProfile);

export default router;
