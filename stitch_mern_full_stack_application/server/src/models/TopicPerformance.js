import mongoose from 'mongoose';

const topicPerformanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    topic: { type: String, required: true, trim: true },
    score: { type: Number, default: 0 },
    attempts: { type: Number, default: 0 },
    trend: { type: String, enum: ['improving', 'stable', 'declining'], default: 'stable' },
  },
  { timestamps: true }
);

topicPerformanceSchema.index({ student: 1, course: 1, topic: 1 }, { unique: true });

const TopicPerformance = mongoose.models.TopicPerformance || mongoose.model('TopicPerformance', topicPerformanceSchema);

export default TopicPerformance;
