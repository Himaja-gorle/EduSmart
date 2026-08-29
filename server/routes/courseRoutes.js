const express = require('express');
const router = express.Router();
const { getCourses, createCourse, getCourseById } = require('../controllers/courseController');
const { requireAuth, requireRole } = require('../middleware/auth');

router.use(requireAuth);
router.route('/').get(getCourses).post(requireRole('admin'), createCourse);
router.route('/:id').get(getCourseById);

module.exports = router;
