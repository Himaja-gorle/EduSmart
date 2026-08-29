const express = require('express');
const router = express.Router();
const { getDepartments, createDepartment } = require('../controllers/departmentController');
const { requireAuth, requireRole } = require('../middleware/auth');

router.use(requireAuth);
router.route('/').get(getDepartments).post(requireRole('admin'), createDepartment);

module.exports = router;
