const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const assignmentController = require('../controllers/assignmentController');

router.use(protect);

router.post(
  '/',
  authorize('faculty', 'admin'),
  upload.single('attachment'),
  assignmentController.createAssignment
);
router.get('/course/:courseId', assignmentController.getAssignmentsByCourse);
router.post(
  '/:assignmentId/submit',
  authorize('student'),
  upload.single('submissionFile'),
  assignmentController.submitAssignment
);
router.get('/:assignmentId/submissions', authorize('faculty', 'admin'), assignmentController.getSubmissionsForAssignment);
router.patch('/:submissionId/grade', authorize('faculty', 'admin'), assignmentController.gradeSubmission);

module.exports = router;
