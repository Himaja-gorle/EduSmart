import Recommendation from '../models/Recommendation.js';
import SupportThreshold from '../models/SupportThreshold.js';
import { generateRecommendations } from '../services/recommendationService.js';

export const getSupportThresholds = async (req, res) => {
  try {
    const thresholds = await SupportThreshold.findOne({ active: true }).sort({ createdAt: -1 });
    return res.status(200).json({ thresholds: thresholds || { attendance: 75, assignment: 80, quiz: 70 } });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch support thresholds', error: error.message });
  }
};

export const updateSupportThresholds = async (req, res) => {
  try {
    const { attendanceThreshold, assignmentThreshold, quizThreshold, declineThreshold } = req.body;

    const thresholdConfig = await SupportThreshold.findOneAndUpdate(
      { active: true },
      {
        attendanceThreshold: attendanceThreshold ?? 75,
        assignmentThreshold: assignmentThreshold ?? 80,
        quizThreshold: quizThreshold ?? 70,
        declineThreshold: declineThreshold ?? 10,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ thresholdConfig });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update support thresholds', error: error.message });
  }
};

export const evaluateStudentSupport = async (req, res) => {
  try {
    const { studentId } = req.params;
    const metrics = {
      studentName: req.query.studentName || 'Student',
      attendance: Number(req.query.attendance ?? 80),
      assignmentCompletion: Number(req.query.assignmentCompletion ?? 85),
      quizAverage: Number(req.query.quizAverage ?? 75),
      recentTrend: req.query.recentTrend || 'stable',
      pendingAssignments: Number(req.query.pendingAssignments ?? 0),
      engagement: Number(req.query.engagement ?? 70),
    };

    const result = generateRecommendations({ studentId, ...metrics });

    return res.status(200).json({
      studentId,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to evaluate support status', error: error.message });
  }
};

export const listRecommendations = async (req, res) => {
  try {
    const { studentId, course } = req.query;
    const filter = {};

    if (studentId) filter.student = studentId;
    if (course) filter.course = course;

    const recommendations = await Recommendation.find(filter)
      .populate('student', 'name email role')
      .populate('course', 'title code')
      .sort({ priority: -1, createdAt: -1 });

    return res.status(200).json({ recommendations });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch recommendations', error: error.message });
  }
};

export default {
  getSupportThresholds,
  updateSupportThresholds,
  evaluateStudentSupport,
  listRecommendations,
};
