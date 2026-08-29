const Enrollment = require('../models/Enrollment');

exports.enrollStudent = async (req, res, next) => {
  try {
    const { studentId, courseId } = req.body;
    const enrollment = await Enrollment.create({ student: studentId, course: courseId });
    res.status(201).json({ success: true, data: enrollment });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Student already enrolled in this course' });
    }
    next(err);
  }
};

exports.getStudentEnrollments = async (req, res, next) => {
  try {
    const studentId = req.user.role === 'student' ? req.user.id : req.params.studentId;
    const enrollments = await Enrollment.find({ student: studentId, status: 'active' })
      .populate({
        path: 'course',
        populate: [
          { path: 'department', select: 'name code' },
          { path: 'faculty', select: 'name email' }
        ]
      });

    res.status(200).json({ success: true, data: enrollments });
  } catch (err) {
    next(err);
  }
};

exports.deleteEnrollment = async (req, res, next) => {
  try {
    await Enrollment.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Enrollment removed successfully' });
  } catch (err) {
    next(err);
  }
};
