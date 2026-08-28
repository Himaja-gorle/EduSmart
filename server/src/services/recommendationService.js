import { calculateSupportIndicator } from './supportEngine.js';

export const generateRecommendations = ({
  studentName = 'Student',
  attendance = 100,
  assignmentCompletion = 100,
  quizAverage = 100,
  recentTrend = 'stable',
  pendingAssignments = 0,
  engagement = 100,
}) => {
  const support = calculateSupportIndicator({
    attendance,
    assignmentCompletion,
    quizAverage,
    recentTrend,
    pendingAssignments,
    engagement,
  });

  const recommendations = [];

  if (attendance < 75) {
    recommendations.push({
      type: 'attendance',
      title: 'Improve attendance consistency',
      message: `Encourage ${studentName} to attend the next few classes and review missed material promptly.`,
      priority: 'high',
    });
  }

  if (assignmentCompletion < 80) {
    recommendations.push({
      type: 'assignment',
      title: 'Complete pending assignments',
      message: `${studentName} should prioritize overdue or low-scoring tasks and request a checkpoint review.`,
      priority: 'high',
    });
  }

  if (quizAverage < 70) {
    recommendations.push({
      type: 'quiz',
      title: 'Reinforce test preparation',
      message: 'Offer targeted revision material and a short guided practice cycle before the next quiz.',
      priority: 'medium',
    });
  }

  if (recentTrend === 'declining') {
    recommendations.push({
      type: 'progress',
      title: 'Stabilize progression trend',
      message: 'Schedule a brief check-in and define a weekly improvement plan across the most impacted courses.',
      priority: 'medium',
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      type: 'encouragement',
      title: 'Maintain current momentum',
      message: `${studentName} is on track. Continue with regular review and engagement.`,
      priority: 'low',
    });
  }

  return {
    support,
    recommendations,
  };
};

export default { generateRecommendations };
