import express from 'express';
import { getCourseAnalytics, getStudentAnalytics, getUniversityAnalytics } from '../controllers/analyticsController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/analytics/student', requireAuth, getStudentAnalytics);
router.get('/analytics/course/:courseId', requireAuth, requireRole(['admin', 'faculty']), getCourseAnalytics);
router.get('/analytics/university', requireAuth, requireRole(['admin']), getUniversityAnalytics);

export default router;
