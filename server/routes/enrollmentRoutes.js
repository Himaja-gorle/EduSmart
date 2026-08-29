const express = require('express');
const router = express.Router();
const { enrollStudent, getStudentEnrollments, deleteEnrollment } = require('../controllers/enrollmentController');
const { requireAuth, requireRole } = require('../middleware/auth');

router.use(requireAuth);
router.route('/')
  .post(requireRole('admin'), enrollStudent)
  .get(getStudentEnrollments);

router.route('/student/:studentId').get(requireRole('admin', 'faculty'), getStudentEnrollments);
router.route('/:id').delete(requireRole('admin'), deleteEnrollment);

module.exports = router;
