import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    startedAt: { type: Date, default: Date.now },
    submittedAt: { type: Date, default: null },
    score: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    responses: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
        selectedOption: { type: Number, default: -1 },
        isCorrect: { type: Boolean, default: false },
        pointsAwarded: { type: Number, default: 0 },
      },
    ],
    status: { type: String, enum: ['in_progress', 'submitted'], default: 'in_progress' },
  },
  { timestamps: true }
);

const QuizAttempt = mongoose.models.QuizAttempt || mongoose.model('QuizAttempt', quizAttemptSchema);

export default QuizAttempt;
