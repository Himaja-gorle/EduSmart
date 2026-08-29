const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');

exports.createAssignment = async (req, res, next) => {
  try {
    const { title, description, course, dueDate, maxMarks } = req.body;
    const assignment = await Assignment.create({
      title,
      description,
      course,
      dueDate,
      maxMarks,
      attachmentUrl: req.file ? `/uploads/${req.file.filename}` : '',
      createdBy: req.user.id
    });

    res.status(201).json({ success: true, data: assignment });
  } catch (err) {
    next(err);
  }
};

exports.getAssignmentsByCourse = async (req, res, next) => {
  try {
    const assignments = await Assignment.find({ course: req.params.courseId })
      .populate('createdBy', 'name email')
      .sort({ dueDate: 1 });

    res.status(200).json({ success: true, data: assignments });
  } catch (err) {
    next(err);
  }
};

exports.submitAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    const submission = await Submission.findOneAndUpdate(
      { assignment: assignment._id, student: req.user.id },
      {
        assignment: assignment._id,
        student: req.user.id,
        fileUrl: req.file ? `/uploads/${req.file.filename}` : req.body.fileUrl,
        status: new Date() > new Date(assignment.dueDate) ? 'late' : 'submitted',
        submittedAt: new Date()
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, data: submission });
  } catch (err) {
    next(err);
  }
};

exports.getSubmissionsForAssignment = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ assignment: req.params.assignmentId })
      .populate('student', 'name email')
      .populate('gradedBy', 'name email');

    res.status(200).json({ success: true, data: submissions });
  } catch (err) {
    next(err);
  }
};

exports.gradeSubmission = async (req, res, next) => {
  try {
    const { marksObtained, feedback } = req.body;
    const submission = await Submission.findById(req.params.submissionId);

    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    const assignment = await Assignment.findById(submission.assignment);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    if (marksObtained > assignment.maxMarks) {
      return res.status(400).json({ success: false, message: 'Marks cannot exceed assignment max marks' });
    }

    submission.marksObtained = marksObtained;
    submission.feedback = feedback || '';
    submission.status = 'graded';
    submission.gradedBy = req.user.id;
    await submission.save();

    res.status(200).json({ success: true, data: submission });
  } catch (err) {
    next(err);
  }
};
