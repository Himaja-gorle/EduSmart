import express from 'express';
import {
  addQuestionToQuiz,
  createQuiz,
  getQuizAnalytics,
  listQuizzes,
  submitQuizAttempt,
} from '../controllers/quizController.js';

const router = express.Router();

router.get('/quizzes', listQuizzes);
router.post('/quizzes', createQuiz);
router.post('/quizzes/:quizId/questions', addQuestionToQuiz);
router.post('/quizzes/:quizId/attempts', submitQuizAttempt);
router.get('/quizzes/:quizId/analytics', getQuizAnalytics);

export default router;
