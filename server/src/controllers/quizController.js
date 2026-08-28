import Question from '../models/Question.js';
import Quiz from '../models/Quiz.js';
import QuizAttempt from '../models/QuizAttempt.js';

export const listQuizzes = async (req, res) => {
  try {
    const { course } = req.query;
    const filter = course ? { course } : {};

    const quizzes = await Quiz.find(filter)
      .populate('course', 'title code')
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 });

    return res.status(200).json({ quizzes });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch quizzes', error: error.message });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { course, title, description, instructions, durationMinutes, dueDate, createdBy, isPublished, topic } = req.body;

    if (!course || !title || !createdBy) {
      return res.status(400).json({ message: 'Course, title, and creator are required' });
    }

    const quiz = await Quiz.create({
      course,
      title,
      description: description || '',
      instructions: instructions || '',
      durationMinutes: durationMinutes || 30,
      dueDate: dueDate || null,
      createdBy,
      isPublished: Boolean(isPublished),
      topic: topic || 'General',
    });

    const populatedQuiz = await Quiz.findById(quiz._id)
      .populate('course', 'title code')
      .populate('createdBy', 'name email role');

    return res.status(201).json({ quiz: populatedQuiz });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create quiz', error: error.message });
  }
};

export const addQuestionToQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { prompt, options, correctOption, topic, difficulty, explanation } = req.body;

    if (!prompt || !options || options.length < 2 || correctOption === undefined) {
      return res.status(400).json({ message: 'Question prompt, options, and correct option are required' });
    }

    const question = await Question.create({
      quiz: quizId,
      prompt,
      options,
      correctOption: Number(correctOption),
      topic: topic || 'General',
      difficulty: difficulty || 'medium',
      explanation: explanation || '',
    });

    return res.status(201).json({ question });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to add question', error: error.message });
  }
};

export const submitQuizAttempt = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { student, responses } = req.body;

    if (!student || !Array.isArray(responses)) {
      return res.status(400).json({ message: 'Student and responses array are required' });
    }

    const questions = await Question.find({ quiz: quizId });
    const answerMap = new Map(questions.map((question) => [question._id.toString(), question.correctOption]));

    let score = 0;
    const normalizedResponses = responses.map((response) => {
      const isCorrect = Number(response.selectedOption) === answerMap.get(String(response.questionId));
      if (isCorrect) score += 1;

      return {
        questionId: response.questionId,
        selectedOption: Number(response.selectedOption),
        isCorrect,
        pointsAwarded: isCorrect ? 1 : 0,
      };
    });

    const percentage = questions.length ? (score / questions.length) * 100 : 0;

    const attempt = await QuizAttempt.create({
      student,
      quiz: quizId,
      responses: normalizedResponses,
      score,
      percentage,
      status: 'submitted',
      submittedAt: new Date(),
    });

    return res.status(201).json({ attempt });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to submit quiz attempt', error: error.message });
  }
};

export const getQuizAnalytics = async (req, res) => {
  try {
    const { quizId } = req.params;
    const questions = await Question.find({ quiz: quizId });
    const attempts = await QuizAttempt.find({ quiz: quizId }).populate('student', 'name email');

    const topicSummary = {};
    questions.forEach((question) => {
      topicSummary[question.topic] = (topicSummary[question.topic] || 0) + 1;
    });

    const averageScore = attempts.length
      ? attempts.reduce((sum, attempt) => sum + (Number(attempt.percentage) || 0), 0) / attempts.length
      : 0;

    return res.status(200).json({
      quizId,
      questionCount: questions.length,
      attemptCount: attempts.length,
      averageScore,
      topics: topicSummary,
      attempts,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to summarize quiz analytics', error: error.message });
  }
};

export default {
  listQuizzes,
  createQuiz,
  addQuestionToQuiz,
  submitQuizAttempt,
  getQuizAnalytics,
};
