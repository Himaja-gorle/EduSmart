import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: null },
    topic: { type: String, default: 'General' },
    title: { type: String, required: true },
    type: { type: String, enum: ['video', 'notes', 'quiz', 'study-plan'], default: 'notes' },
    description: { type: String, default: '' },
    reason: { type: String, default: '' },
    priority: { type: Number, default: 1 },
    resourceUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

const Recommendation = mongoose.models.Recommendation || mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;
