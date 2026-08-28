import StudyPlan from '../models/StudyPlan.js';

export const listStudyPlans = async (req, res) => {
  try {
    const { student } = req.query;
    const filter = student ? { student } : {};

    const plans = await StudyPlan.find(filter)
      .populate('student', 'name email role')
      .sort({ updatedAt: -1 });

    return res.status(200).json({ plans });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to load study plans', error: error.message });
  }
};

export const createStudyPlan = async (req, res) => {
  try {
    const { student, title, subjects, availableHours, assessmentDates, weakTopics, preferredStudyPeriods, tasks, status } = req.body;

    if (!student) {
      return res.status(400).json({ success: false, message: 'Student is required' });
    }

    const plan = await StudyPlan.create({
      student,
      title: title || 'Study Plan',
      subjects: subjects || [],
      availableHours: availableHours || 0,
      assessmentDates: assessmentDates || [],
      weakTopics: weakTopics || [],
      preferredStudyPeriods: preferredStudyPeriods || [],
      tasks: tasks || [],
      status: status || 'active',
    });

    return res.status(201).json({ success: true, message: 'Study plan created', data: plan });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create study plan', error: error.message });
  }
};

export const updateStudyPlan = async (req, res) => {
  try {
    const plan = await StudyPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!plan) {
      return res.status(404).json({ success: false, message: 'Study plan not found' });
    }

    return res.status(200).json({ success: true, message: 'Study plan updated', data: plan });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update study plan', error: error.message });
  }
};

export default { listStudyPlans, createStudyPlan, updateStudyPlan };
