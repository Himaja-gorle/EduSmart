const dashboardTemplates = {
  student: {
    summary: {
      gpa: '3.45',
      attendance: '82%',
      assignmentsComplete: '76%',
      riskLevel: 'Moderate Risk',
    },
    indicators: [
      { label: 'Attendance', value: '82%', trend: '-8%', severity: 'warning' },
      { label: 'Assignment Completion', value: '76%', trend: '+5%', severity: 'good' },
      { label: 'Quiz Performance', value: '68%', trend: '-4%', severity: 'warning' },
    ],
    interventions: [
      { title: 'Faculty check-in scheduled', detail: 'Math tutoring session on Friday 3:00 PM', status: 'Pending' },
      { title: 'Academic advisor note', detail: 'Follow-up on attendance recovery plan', status: 'Actioned' },
    ],
    notifications: [
      { title: 'New recommendation', detail: 'Calculus review materials are now available', time: '2h ago' },
      { title: 'Deadline reminder', detail: 'Data Structures assignment due tomorrow', time: '5h ago' },
    ],
  },
  faculty: {
    summary: {
      activeStudents: '124',
      atRiskStudents: '17',
      interventions: '8',
      successRate: '88%',
    },
    indicators: [
      { label: 'Engagement', value: '89%', trend: '+6%', severity: 'good' },
      { label: 'Course Completion', value: '72%', trend: '-3%', severity: 'warning' },
      { label: 'Intervention Response', value: '91%', trend: '+4%', severity: 'good' },
    ],
    interventions: [
      { title: 'Support plan review', detail: '3 students require attention this week', status: 'In Review' },
      { title: 'Mentoring session', detail: 'CS101 workshop is scheduled for Tuesday', status: 'Scheduled' },
    ],
    notifications: [
      { title: 'Risk summary', detail: 'Two students crossed the intervention threshold', time: '30m ago' },
      { title: 'Submission updates', detail: '8 late assignments were submitted today', time: '1d ago' },
    ],
  },
  admin: {
    summary: {
      totalStudents: '8,420',
      interventionRate: '12.4%',
      retention: '91.2%',
      resourcesAllocated: '$24k',
    },
    indicators: [
      { label: 'Institutional Risk', value: '12.4%', trend: '-1.2%', severity: 'good' },
      { label: 'Dashboard Adoption', value: '94%', trend: '+4%', severity: 'good' },
      { label: 'Faculty Response', value: '87%', trend: '+2%', severity: 'good' },
    ],
    interventions: [
      { title: 'University-wide intervention rollout', detail: 'Faculty workshops are live across departments', status: 'Live' },
      { title: 'Threshold adjustment', detail: 'Academic support settings reviewed for spring', status: 'Approved' },
    ],
    notifications: [
      { title: 'Performance snapshot', detail: 'Retention has improved year-over-year', time: '1h ago' },
      { title: 'System alert', detail: 'Two departments need additional support resources', time: '3h ago' },
    ],
  },
};

export const getDashboardSummary = async (req, res) => {
  const role = req.user.role || 'student';
  const template = dashboardTemplates[role] || dashboardTemplates.student;

  return res.status(200).json({
    user: { name: req.user.name, role },
    summary: template.summary,
  });
};

export const getSupportIndicators = async (req, res) => {
  const role = req.user.role || 'student';
  const template = dashboardTemplates[role] || dashboardTemplates.student;

  return res.status(200).json({ indicators: template.indicators });
};

export const getInterventions = async (req, res) => {
  const role = req.user.role || 'student';
  const template = dashboardTemplates[role] || dashboardTemplates.student;

  return res.status(200).json({ interventions: template.interventions });
};

export const getNotifications = async (req, res) => {
  const role = req.user.role || 'student';
  const template = dashboardTemplates[role] || dashboardTemplates.student;

  return res.status(200).json({ notifications: template.notifications });
};
