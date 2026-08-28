import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['present', 'absent', 'late'], default: 'present' },
    minutesPresent: { type: Number, default: 0 },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

attendanceSchema.index({ student: 1, course: 1, date: 1 }, { unique: true });

const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);

export default Attendance;
