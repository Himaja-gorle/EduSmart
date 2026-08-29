const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const {
  markDailyAttendance,
  getCourseAttendanceSummary,
  getStudentAttendanceOverview
} = require('../controllers/attendanceController');

router.use(requireAuth);

router.post('/mark', requireRole('faculty', 'admin'), markDailyAttendance);
router.get('/course/:courseId', requireRole('faculty', 'admin'), getCourseAttendanceSummary);
router.get('/my-summary', requireRole('student'), getStudentAttendanceOverview);

module.exports = router;
