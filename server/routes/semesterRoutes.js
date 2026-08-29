const express = require('express');
const router = express.Router();
const { getSemesters, createSemester } = require('../controllers/semesterController');
const { requireAuth, requireRole } = require('../middleware/auth');

router.use(requireAuth);
router.route('/').get(getSemesters).post(requireRole('admin'), createSemester);

module.exports = router;
