import mongoose from 'mongoose';

const interventionSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: null },
    interventionDate: { type: Date, required: true },
    note: { type: String, default: '', trim: true },
    actionTaken: { type: String, enum: ['Contacted student', 'Recommended material', 'Scheduled mentoring', 'Follow-up required'], default: 'Contacted student' },
    followUpDate: { type: Date, default: null },
    status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
  },
  { timestamps: true }
);

const Intervention = mongoose.models.Intervention || mongoose.model('Intervention', interventionSchema);

export default Intervention;
