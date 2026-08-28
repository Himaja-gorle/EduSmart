import Attendance from '../models/Attendance.js';
import Enrollment from '../models/Enrollment.js';

export const listEnrollments = async (req, res) => {
  try {
    const { student, course, semester } = req.query;
    const filter = {};

    if (student) filter.student = student;
    if (course) filter.course = course;
    if (semester) filter.semester = semester;

    const enrollments = await Enrollment.find(filter)
      .populate('student', 'name email role')
      .populate('course', 'title code')
      .populate('semester', 'name academicYear')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: enrollments, message: 'Enrollments loaded successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to fetch enrollments', error: error.message });
  }
};

export const createEnrollment = async (req, res) => {
  try {
    const { student, course, semester, status, finalGrade } = req.body;

    if (!student || !course || !semester) {
      return res.status(400).json({ success: false, message: 'Student, course, and semester are required' });
    }

    const enrollment = await Enrollment.findOneAndUpdate(
      { student, course },
      {
        student,
        course,
        semester,
        status: status || 'active',
        finalGrade: finalGrade || '',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
      .populate('student', 'name email role')
      .populate('course', 'title code')
      .populate('semester', 'name academicYear');

    return res.status(201).json({ success: true, message: 'Enrollment created successfully', data: enrollment });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create enrollment', error: error.message });
  }
};

export const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    return res.status(200).json({ success: true, message: 'Enrollment deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to delete enrollment', error: error.message });
  }
};

export const listAttendance = async (req, res) => {
  try {
    const { course, student } = req.query;
    const filter = {};

    if (course) filter.course = course;
    if (student) filter.student = student;

    const records = await Attendance.find(filter)
      .populate('student', 'name email')
      .populate('course', 'title code')
      .sort({ date: 1 });

    return res.status(200).json({ success: true, data: records, message: 'Attendance records loaded successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to fetch attendance', error: error.message });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { student, course, date, status, minutesPresent, notes } = req.body;

    if (!student || !course || !date) {
      return res.status(400).json({ success: false, message: 'Student, course, and date are required' });
    }

    const attendanceRecord = await Attendance.findOneAndUpdate(
      { student, course, date: new Date(date) },
      {
        student,
        course,
        date: new Date(date),
        status: status || 'present',
        minutesPresent: minutesPresent || 0,
        notes: notes || '',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
      .populate('student', 'name email')
      .populate('course', 'title code');

    return res.status(201).json({ success: true, message: 'Attendance recorded successfully', data: attendanceRecord });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to record attendance', error: error.message });
  }
};

export const getAttendanceSummary = async (req, res) => {
  try {
    const records = await Attendance.find({ course: req.params.courseId })
      .populate('student', 'name email')
      .populate('course', 'title code');

    const summary = {
      total: records.length,
      present: 0,
      absent: 0,
      late: 0,
    };

    records.forEach((record) => {
      if (summary[record.status] !== undefined) {
        summary[record.status] += 1;
      }
    });

    return res.status(200).json({ success: true, data: { courseId: req.params.courseId, summary, records }, message: 'Attendance summary loaded successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to summarize attendance', error: error.message });
  }
};

export default {
  listEnrollments,
  createEnrollment,
  deleteEnrollment,
  listAttendance,
  markAttendance,
  getAttendanceSummary,
};
