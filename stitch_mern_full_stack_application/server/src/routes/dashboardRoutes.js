import express from 'express';
import {
  getDashboardSummary,
  getSupportIndicators,
  getInterventions,
  getNotifications,
} from '../controllers/dashboardController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', requireAuth, getDashboardSummary);
router.get('/support-indicators', requireAuth, getSupportIndicators);
router.get('/interventions', requireAuth, getInterventions);
router.get('/notifications', requireAuth, getNotifications);

export default router;
