import Intervention from '../models/Intervention.js';

export const listInterventions = async (req, res) => {
  try {
    const { student, faculty, status } = req.query;
    const filter = {};

    if (student) filter.student = student;
    if (faculty) filter.faculty = faculty;
    if (status) filter.status = status;

    const interventions = await Intervention.find(filter)
      .populate('student', 'name email role')
      .populate('faculty', 'name email role')
      .populate('course', 'title code')
      .sort({ interventionDate: -1 });

    return res.status(200).json({ interventions });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to load interventions', error: error.message });
  }
};

export const createIntervention = async (req, res) => {
  try {
    const { student, faculty, course, interventionDate, note, actionTaken, followUpDate, status } = req.body;

    if (!student || !faculty || !interventionDate) {
      return res.status(400).json({ success: false, message: 'Student, faculty, and intervention date are required' });
    }

    const intervention = await Intervention.create({
      student,
      faculty,
      course: course || null,
      interventionDate,
      note: note || '',
      actionTaken: actionTaken || 'Contacted student',
      followUpDate: followUpDate || null,
      status: status || 'open',
    });

    return res.status(201).json({ success: true, message: 'Intervention created successfully', data: intervention });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create intervention', error: error.message });
  }
};

export const updateIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!intervention) {
      return res.status(404).json({ success: false, message: 'Intervention not found' });
    }

    return res.status(200).json({ success: true, message: 'Intervention updated successfully', data: intervention });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update intervention', error: error.message });
  }
};

export default { listInterventions, createIntervention, updateIntervention };
