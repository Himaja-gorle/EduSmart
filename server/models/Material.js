const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Material title is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required']
    },
    topic: {
      type: String,
      required: [true, 'Topic tag is required'],
      trim: true
    },
    type: {
      type: String,
      enum: ['pdf', 'ppt', 'doc', 'video', 'link'],
      required: [true, 'Material type is required']
    },
    fileUrl: {
      type: String,
      default: ''
    },
    externalLink: {
      type: String,
      default: ''
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Material', materialSchema);
