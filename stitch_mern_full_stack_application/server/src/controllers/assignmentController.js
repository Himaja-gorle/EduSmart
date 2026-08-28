import Assignment from '../models/Assignment.js';
import Submission from '../models/Submission.js';

// Standardized responses: { success, data, message }
export const listAssignments = async (req, res) => {
  try {
    const { course } = req.query;
    const filter = course ? { course } : {};

    const assignments = await Assignment.find(filter)
      .populate('course', 'title code')
      .populate('createdBy', 'name email role')
      .sort({ dueDate: 1 });

    return res.status(200).json({ success: true, data: { assignments } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to fetch assignments', error: error.message });
  }
};

export const getAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id)
      .populate('course', 'title code')
      .populate('createdBy', 'name email role');

    if (!assignment) return res.status(404).json({ success: false, message: 'Assignment not found' });

    return res.status(200).json({ success: true, data: { assignment } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to fetch assignment', error: error.message });
  }
};

export const createAssignment = async (req, res) => {
  try {
    // Prefer server-side creator identity
    const creatorId = req.user && req.user._id ? req.user._id : req.body.createdBy;
    const { course, title, description, instructions, dueDate, maxMarks, type } = req.body;

    if (!course || !title || !dueDate) {
      return res.status(400).json({ success: false, message: 'Course, title and due date are required' });
    }

    const assignment = await Assignment.create({
      course,
      title,
      description: description || '',
      instructions: instructions || '',
      dueDate,
      maxMarks: maxMarks || 100,
      type: type || 'homework',
      createdBy: creatorId,
    });

    const populatedAssignment = await Assignment.findById(assignment._id)
      .populate('course', 'title code')
      .populate('createdBy', 'name email role');

    return res.status(201).json({ success: true, data: { assignment: populatedAssignment }, message: 'Assignment created' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create assignment', error: error.message });
  }
};

export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    // Use authenticated user if available
    const studentId = req.user && req.user._id ? req.user._id : req.body.student;
    const { content, fileUrl } = req.body;

    if (!studentId) {
      return res.status(400).json({ success: false, message: 'Student identity is required' });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    // Use assignment's course if caller didn't provide one
    const courseId = req.body.course || assignment.course;

    // Determine lateness
    const now = new Date();
    const status = assignment.dueDate && now > assignment.dueDate ? 'late' : 'submitted';

    const submission = await Submission.findOneAndUpdate(
      { assignment: assignmentId, student: studentId },
      {
        assignment: assignmentId,
        student: studentId,
        course: courseId,
        content: content || '',
        fileUrl: fileUrl || '',
        status,
        submittedAt: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
      .populate('assignment', 'title dueDate')
      .populate('student', 'name email');

    return res.status(201).json({ success: true, data: { submission }, message: 'Submission saved' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to submit assignment', error: error.message });
  }
};

export const gradeSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const graderId = req.user && req.user._id ? req.user._id : req.body.gradedBy;
    const { score, feedback } = req.body;

    const submission = await Submission.findById(id);
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    submission.score = Number(score) || 0;
    submission.feedback = feedback || '';
    submission.gradedBy = graderId || null;
    submission.status = 'graded';
    await submission.save();

    const populated = await Submission.findById(submission._id)
      .populate('assignment', 'title dueDate')
      .populate('student', 'name email')
      .populate('gradedBy', 'name email');

    return res.status(200).json({ success: true, data: { submission: populated }, message: 'Submission graded' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to grade submission', error: error.message });
  }
};

export const listSubmissions = async (req, res) => {
  try {
    const { assignment, student } = req.query;
    const filter = {};

    if (assignment) filter.assignment = assignment;
    if (student) filter.student = student;

    const submissions = await Submission.find(filter)
      .populate('assignment', 'title dueDate')
      .populate('student', 'name email')
      .populate('course', 'title code')
      .sort({ submittedAt: -1 });

    return res.status(200).json({ success: true, data: { submissions } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to fetch submissions', error: error.message });
  }
};

export default {
  listAssignments,
  getAssignment,
  createAssignment,
  submitAssignment,
  gradeSubmission,
  listSubmissions,
};
