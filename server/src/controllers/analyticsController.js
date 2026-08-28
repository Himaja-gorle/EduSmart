import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import User from '../models/User.js';
import TopicPerformance from '../models/TopicPerformance.js';

export const getStudentAnalytics = async (req, res) => {
  try {
    const { studentId } = req.query;

    if (!studentId) {
      return res.status(400).json({ success: false, message: 'studentId is required' });
    }

    const topicData = await TopicPerformance.find({ student: studentId }).sort({ score: 1 });
    const enrolledCourses = await Enrollment.find({ student: studentId }).countDocuments();
    const student = await User.findById(studentId).select('name email role');

    return res.status(200).json({
      success: true,
      data: {
        student,
        enrolledCourses,
        weakTopics: topicData.filter((item) => item.score < 60).map((item) => ({ topic: item.topic, score: item.score })),
        performanceByTopic: topicData,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to load student analytics', error: error.message });
  }
};

export const getCourseAnalytics = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('department', 'name code');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const enrolledStudents = await Enrollment.countDocuments({ course: req.params.courseId });
    const topicBreakdown = await TopicPerformance.find({ course: req.params.courseId }).sort({ score: 1 });

    return res.status(200).json({
      success: true,
      data: {
        course,
        enrolledStudents,
        topicBreakdown,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to load course analytics', error: error.message });
  }
};

export const getUniversityAnalytics = async (req, res) => {
  try {
    const students = await User.countDocuments({ role: 'student' });
    const faculty = await User.countDocuments({ role: 'faculty' });
    const courses = await Course.countDocuments();
    const enrollments = await Enrollment.countDocuments();

    return res.status(200).json({
      success: true,
      data: {
        students,
        faculty,
        courses,
        enrollments,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to load university analytics', error: error.message });
  }
};

export default { getStudentAnalytics, getCourseAnalytics, getUniversityAnalytics };
