import express from 'express';
import { createAnnouncement, listAnnouncements } from '../controllers/announcementController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/announcements', requireAuth, listAnnouncements);
router.post('/announcements', requireAuth, requireRole(['admin', 'faculty']), createAnnouncement);

export default router;
