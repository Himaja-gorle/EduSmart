import mongoose from 'mongoose';

const supportThresholdSchema = new mongoose.Schema(
  {
    institutionName: { type: String, default: 'EduSmart' },
    attendanceThreshold: { type: Number, default: 75 },
    assignmentThreshold: { type: Number, default: 80 },
    quizThreshold: { type: Number, default: 70 },
    declineThreshold: { type: Number, default: 10 },
    active: { type: Boolean, default: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

const SupportThreshold = mongoose.models.SupportThreshold || mongoose.model('SupportThreshold', supportThresholdSchema);

export default SupportThreshold;
