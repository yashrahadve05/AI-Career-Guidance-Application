import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getRecommendations, getAllCareers } from '../controllers/careerController.js';

const router = express.Router();

router.get('/', getAllCareers);
router.get('/recommendations', verifyToken, getRecommendations);

export default router;

