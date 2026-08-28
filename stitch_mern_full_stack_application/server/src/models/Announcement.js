import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: null },
    audience: { type: String, enum: ['all', 'student', 'faculty', 'admin'], default: 'all' },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);

export default Announcement;
