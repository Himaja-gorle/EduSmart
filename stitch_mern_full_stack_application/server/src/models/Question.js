import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    prompt: { type: String, required: true, trim: true },
    options: [{ type: String, required: true, trim: true }],
    correctOption: { type: Number, required: true, min: 0 },
    topic: { type: String, default: 'General' },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    explanation: { type: String, default: '' },
  },
  { timestamps: true }
);

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

export default Question;
