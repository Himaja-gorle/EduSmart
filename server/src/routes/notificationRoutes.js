import express from 'express';
import { createNotification, listNotifications, markNotificationRead } from '../controllers/notificationController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/notifications', requireAuth, listNotifications);
router.post('/notifications', requireAuth, requireRole(['admin', 'faculty']), createNotification);
router.put('/notifications/:id/read', requireAuth, markNotificationRead);

export default router;
