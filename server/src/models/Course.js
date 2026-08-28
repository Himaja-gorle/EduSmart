import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true, uppercase: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    credits: { type: Number, default: 3 },
    capacity: { type: Number, default: 60 },
    schedule: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'active', 'archived'], default: 'draft' },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;
