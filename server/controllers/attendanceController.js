const AttendanceRecord = require('../models/Attendance');
const AttendanceSummary = require('../models/AttendanceSummary');

const ATTENDANCE_THRESHOLD = 75.0; // Standard threshold percentage

exports.markDailyAttendance = async (req, res, next) => {
  try {
    const { course, date, sessionTopic, records } = req.body; // records: [{ student, status }]

    const parsedDate = new Date(date);
    parsedDate.setHours(0, 0, 0, 0);

    const attendanceRecord = await AttendanceRecord.create({
      course,
      date: parsedDate,
      sessionTopic,
      records,
      markedBy: req.user.id
    });

    // Update aggregate attendance statistics per student
    for (const entry of records) {
      let summary = await AttendanceSummary.findOne({ course, student: entry.student });

      if (!summary) {
        summary = new AttendanceSummary({ course, student: entry.student });
      }

      summary.totalSessions += 1;
      if (entry.status === 'present') {
        summary.attendedSessions += 1;
      }

      summary.percentage = Number(((summary.attendedSessions / summary.totalSessions) * 100).toFixed(2));
      summary.isLowAttendance = summary.percentage < ATTENDANCE_THRESHOLD;

      await summary.save();
    }

    res.status(201).json({
      success: true,
      message: 'Attendance recorded and summaries updated successfully',
      data: attendanceRecord
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Attendance record for this course and date already exists'
      });
    }
    next(err);
  }
};

exports.getCourseAttendanceSummary = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const summaries = await AttendanceSummary.find({ course: courseId })
      .populate('student', 'name email')
      .sort({ percentage: 1 });

    res.status(200).json({ success: true, data: summaries });
  } catch (err) {
    next(err);
  }
};

exports.getStudentAttendanceOverview = async (req, res, next) => {
  try {
    const studentId = req.user.role === 'student' ? req.user.id : req.query.studentId;

    if (!studentId) {
      return res.status(400).json({ success: false, message: 'Student ID is required' });
    }

    const summaries = await AttendanceSummary.find({ student: studentId }).populate('course', 'title code');

    res.status(200).json({ success: true, data: summaries });
  } catch (err) {
    next(err);
  }
};
