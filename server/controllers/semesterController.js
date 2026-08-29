const Semester = require('../models/Semester');

exports.getSemesters = async (req, res, next) => {
  try {
    const semesters = await Semester.find().sort({ startDate: -1 });
    res.status(200).json({ success: true, data: semesters });
  } catch (err) {
    next(err);
  }
};

exports.createSemester = async (req, res, next) => {
  try {
    if (req.body.isCurrent) {
      await Semester.updateMany({}, { isCurrent: false });
    }
    const semester = await Semester.create(req.body);
    res.status(201).json({ success: true, data: semester });
  } catch (err) {
    next(err);
  }
};
