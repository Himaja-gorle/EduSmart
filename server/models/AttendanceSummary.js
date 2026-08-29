const mongoose = require('mongoose');

const attendanceSummarySchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    totalSessions: {
      type: Number,
      default: 0
    },
    attendedSessions: {
      type: Number,
      default: 0
    },
    percentage: {
      type: Number,
      default: 100.0
    },
    isLowAttendance: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

attendanceSummarySchema.index({ course: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('AttendanceSummary', attendanceSummarySchema);
