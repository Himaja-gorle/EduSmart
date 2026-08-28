import mongoose from 'mongoose';

const studyPlanTaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    dueDate: { type: Date, default: null },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    done: { type: Boolean, default: false },
    notes: { type: String, default: '' },
  },
  { _id: true }
);

const studyPlanSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'Study Plan' },
    subjects: [{ type: String, trim: true }],
    availableHours: { type: Number, default: 0 },
    assessmentDates: [{ type: Date }],
    weakTopics: [{ type: String, trim: true }],
    preferredStudyPeriods: [{ type: String, trim: true }],
    tasks: [studyPlanTaskSchema],
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
  },
  { timestamps: true }
);

const StudyPlan = mongoose.models.StudyPlan || mongoose.model('StudyPlan', studyPlanSchema);

export default StudyPlan;
