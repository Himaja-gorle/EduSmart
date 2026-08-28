import express from 'express';
import {
  evaluateStudentSupport,
  getSupportThresholds,
  listRecommendations,
  updateSupportThresholds,
} from '../controllers/supportController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/support/thresholds', requireAuth, getSupportThresholds);
router.put('/support/thresholds', requireAuth, requireRole(['admin', 'faculty']), updateSupportThresholds);
router.get('/support/student/:studentId', requireAuth, evaluateStudentSupport);
router.get('/support/recommendations', requireAuth, listRecommendations);

export default router;
