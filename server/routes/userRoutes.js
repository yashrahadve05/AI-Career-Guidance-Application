import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getOrCreateUser, updateUserProfile, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.post('/profile', verifyToken, getOrCreateUser);
router.put('/profile', verifyToken, updateUserProfile);

export default router;

