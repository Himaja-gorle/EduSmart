const Course = require('../models/Course');

exports.getCourses = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role === 'faculty') {
      query.faculty = req.user.id;
    }

    const courses = await Course.find(query)
      .populate('department', 'name code')
      .populate('semester', 'name academicYear')
      .populate('faculty', 'name email');

    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    next(err);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('department', 'name code')
      .populate('semester', 'name academicYear')
      .populate('faculty', 'name email');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};
