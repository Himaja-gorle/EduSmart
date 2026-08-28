import express from 'express';
import {
  createCourse,
  createDepartment,
  createSemester,
  deleteCourse,
  deleteDepartment,
  deleteSemester,
  getCourse,
  listCourses,
  listDepartments,
  listSemesters,
  updateCourse,
  updateDepartment,
  updateSemester,
} from '../controllers/academicController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/departments', requireAuth, listDepartments);
router.post('/departments', requireAuth, requireRole(['admin', 'faculty']), createDepartment);
router.put('/departments/:id', requireAuth, requireRole(['admin', 'faculty']), updateDepartment);
router.delete('/departments/:id', requireAuth, requireRole(['admin']), deleteDepartment);

router.get('/semesters', requireAuth, listSemesters);
router.post('/semesters', requireAuth, requireRole(['admin', 'faculty']), createSemester);
router.put('/semesters/:id', requireAuth, requireRole(['admin', 'faculty']), updateSemester);
router.delete('/semesters/:id', requireAuth, requireRole(['admin']), deleteSemester);

router.get('/courses', requireAuth, listCourses);
router.get('/courses/:id', requireAuth, getCourse);
router.post('/courses', requireAuth, requireRole(['admin', 'faculty']), createCourse);
router.put('/courses/:id', requireAuth, requireRole(['admin', 'faculty']), updateCourse);
router.delete('/courses/:id', requireAuth, requireRole(['admin']), deleteCourse);

export default router;
