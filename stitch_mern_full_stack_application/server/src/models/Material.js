import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ['pdf', 'video', 'presentation', 'link', 'document'], default: 'document' },
    description: { type: String, default: '' },
    fileUrl: { type: String, default: '' },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, default: true },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const Material = mongoose.models.Material || mongoose.model('Material', materialSchema);

export default Material;
