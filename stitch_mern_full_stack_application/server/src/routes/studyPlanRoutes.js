import express from 'express';
import { createStudyPlan, listStudyPlans, updateStudyPlan } from '../controllers/studyPlanController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/study-plans', requireAuth, listStudyPlans);
router.post('/study-plans', requireAuth, requireRole(['student']), createStudyPlan);
router.put('/study-plans/:id', requireAuth, requireRole(['student']), updateStudyPlan);

export default router;
