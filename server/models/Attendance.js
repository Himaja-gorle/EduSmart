const mongoose = require('mongoose');

const attendanceEntrySchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'excused'],
    required: true
  }
});

const attendanceRecordSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    date: {
      type: Date,
      required: [true, 'Session date is required']
    },
    sessionTopic: {
      type: String,
      default: ''
    },
    records: [attendanceEntrySchema],
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

attendanceRecordSchema.index({ course: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('AttendanceRecord', attendanceRecordSchema);
