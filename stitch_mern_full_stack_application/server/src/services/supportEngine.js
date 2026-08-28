const defaultThresholds = {
  attendance: 75,
  assignment: 80,
  quiz: 70,
  decline: 10,
};

export const calculateSupportIndicator = ({
  attendance = 100,
  assignmentCompletion = 100,
  quizAverage = 100,
  recentTrend = 'stable',
  pendingAssignments = 0,
  engagement = 100,
  thresholds = defaultThresholds,
}) => {
  const reasons = [];

  if (attendance < thresholds.attendance) {
    reasons.push('Attendance below configured threshold');
  }

  if (assignmentCompletion < thresholds.assignment) {
    reasons.push('Assignment completion below configured threshold');
  }

  if (quizAverage < thresholds.quiz) {
    reasons.push('Quiz average below configured threshold');
  }

  if (recentTrend === 'declining') {
    reasons.push('Recent assessment performance is declining');
  }

  if (pendingAssignments > 2) {
    reasons.push('Multiple assignments are still pending');
  }

  if (engagement < 60) {
    reasons.push('Course engagement is low');
  }

  let level = 'LOW';

  if (reasons.length >= 4 || attendance < 60 || quizAverage < 50 || assignmentCompletion < 60) {
    level = 'HIGH';
  } else if (reasons.length >= 2 || recentTrend === 'declining' || attendance < 75) {
    level = 'MODERATE';
  }

  return {
    level,
    reasons: reasons.length ? reasons : ['Performance remains within acceptable academic thresholds'],
    summary: `${level} support indicator for the current academic period`,
    thresholds,
  };
};

export default { calculateSupportIndicator, defaultThresholds };
