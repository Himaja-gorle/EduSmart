import express from 'express';
import {
  createEnrollment,
  deleteEnrollment,
  getAttendanceSummary,
  listAttendance,
  listEnrollments,
  markAttendance,
} from '../controllers/enrollmentController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/enrollments', requireAuth, listEnrollments);
router.post('/enrollments', requireAuth, requireRole(['admin', 'faculty']), createEnrollment);
router.delete('/enrollments/:id', requireAuth, requireRole(['admin']), deleteEnrollment);

router.get('/attendance', requireAuth, listAttendance);
router.post('/attendance', requireAuth, requireRole(['admin', 'faculty']), markAttendance);
router.get('/attendance/:courseId/summary', requireAuth, getAttendanceSummary);

export default router;
