import express from 'express';
import {
  createAssignment,
  gradeSubmission,
  listAssignments,
  listSubmissions,
  submitAssignment,
  getAssignment,
} from '../controllers/assignmentController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// List assignments (optionally filter by course)
router.get('/assignments', requireAuth, listAssignments);
// Get single assignment
router.get('/assignments/:id', requireAuth, getAssignment);
// Create assignment (faculty/admin)
router.post('/assignments', requireAuth, requireRole(['admin', 'faculty']), createAssignment);
// Student submit (uses authenticated user as student)
router.post('/assignments/:assignmentId/submit', requireAuth, requireRole(['student']), submitAssignment);

// Generic submissions list (admin/faculty can query; students will only query their own via query param)
router.get('/submissions', requireAuth, listSubmissions);
// Grade a submission
router.put('/submissions/:id/grade', requireAuth, requireRole(['admin', 'faculty']), gradeSubmission);

export default router;
