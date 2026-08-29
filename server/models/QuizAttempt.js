const mongoose = require('mongoose');

const studentAnswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  selectedOptionIndex: {
    type: Number,
    default: null
  },
  isCorrect: {
    type: Boolean,
    default: false
  },
  topicTag: {
    type: String,
    required: true
  }
});

const quizAttemptSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    answers: [studentAnswerSchema],
    scoreObtained: {
      type: Number,
      required: true,
      default: 0
    },
    percentage: {
      type: Number,
      required: true,
      default: 0
    },
    topicBreakdown: [
      {
        topicTag: String,
        correctCount: Number,
        totalQuestions: Number,
        accuracyPercentage: Number
      }
    ],
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

quizAttemptSchema.index({ quiz: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
