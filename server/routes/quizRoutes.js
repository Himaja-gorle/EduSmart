const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const {
  createQuiz,
  getQuizzesByCourse,
  submitQuizAttempt,
  getStudentQuizAnalytics
} = require('../controllers/quizController');

router.use(requireAuth);

router.post('/', requireRole('faculty', 'admin'), createQuiz);
router.get('/course/:courseId', getQuizzesByCourse);
router.post('/:quizId/submit', requireRole('student'), submitQuizAttempt);
router.get('/:quizId/analytics', getStudentQuizAnalytics);

module.exports = router;
