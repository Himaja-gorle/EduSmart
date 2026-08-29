const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');

exports.createQuiz = async (req, res, next) => {
  try {
    const { title, description, course, questions, durationMinutes, isPublished } = req.body;

    const quiz = await Quiz.create({
      title,
      description,
      course,
      questions,
      durationMinutes,
      isPublished: isPublished || false,
      createdBy: req.user.id
    });

    res.status(201).json({ success: true, data: quiz });
  } catch (err) {
    next(err);
  }
};

exports.getQuizzesByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const query = { course: courseId };

    if (req.user.role === 'student') {
      query.isPublished = true;
    }

    const quizzes = await Quiz.find(query).select('-questions.correctOptionIndex').sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: quizzes });
  } catch (err) {
    next(err);
  }
};

exports.submitQuizAttempt = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // Array of { questionId, selectedOptionIndex }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    let scoreObtained = 0;
    const processedAnswers = [];
    const topicStats = {};

    quiz.questions.forEach((q) => {
      const studentAns = answers.find((a) => a.questionId.toString() === q._id.toString());
      const selectedIndex = studentAns ? studentAns.selectedOptionIndex : null;
      const isCorrect = selectedIndex !== null && selectedIndex === q.correctOptionIndex;

      if (isCorrect) scoreObtained += q.marks;

      processedAnswers.push({
        questionId: q._id,
        selectedOptionIndex: selectedIndex,
        isCorrect,
        topicTag: q.topicTag
      });

      // Track accuracy per topic
      if (!topicStats[q.topicTag]) {
        topicStats[q.topicTag] = { correctCount: 0, totalQuestions: 0 };
      }
      topicStats[q.topicTag].totalQuestions += 1;
      if (isCorrect) topicStats[q.topicTag].correctCount += 1;
    });

    const percentage = Number(((scoreObtained / quiz.totalMarks) * 100).toFixed(2));

    const topicBreakdown = Object.keys(topicStats).map((tag) => ({
      topicTag: tag,
      correctCount: topicStats[tag].correctCount,
      totalQuestions: topicStats[tag].totalQuestions,
      accuracyPercentage: Number(
        ((topicStats[tag].correctCount / topicStats[tag].totalQuestions) * 100).toFixed(2)
      )
    }));

    const attempt = await QuizAttempt.create({
      quiz: quizId,
      student: req.user.id,
      answers: processedAnswers,
      scoreObtained,
      percentage,
      topicBreakdown
    });

    res.status(201).json({ success: true, data: attempt });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Quiz already attempted' });
    }
    next(err);
  }
};

exports.getStudentQuizAnalytics = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const attempt = await QuizAttempt.findOne({ quiz: quizId, student: req.user.id }).populate(
      'quiz',
      'title totalMarks'
    );

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'No attempt found for this quiz' });
    }

    res.status(200).json({ success: true, data: attempt });
  } catch (err) {
    next(err);
  }
};
