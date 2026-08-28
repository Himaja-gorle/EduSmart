import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import api from '../services/api.js';

const baseNav = [
  { label: 'Overview', href: '#' },
  { label: 'Courses', href: '#' },
  { label: 'Support', href: '#' },
  { label: 'Reports', href: '#' },
];

const palette = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'];

function DashboardShell({ title, subtitle, navItems, userRole, children }) {
  return React.createElement(
    'div',
    { className: 'shell-layout' },
    React.createElement(
      'aside',
      { className: 'sidebar' },
      React.createElement(
        'div',
        { className: 'brand-block' },
        React.createElement('div', { className: 'brand-mark' }, 'E'),
        React.createElement(
          'div',
          null,
          React.createElement('h2', null, 'EduSmart'),
          React.createElement('small', null, `${userRole} portal`)
        )
      ),
      React.createElement(
        'nav',
        { className: 'nav-stack' },
        ...navItems.map((item) =>
          React.createElement(
            'a',
            {
              key: item.label,
              href: item.href,
              className: item.label === 'Overview' ? 'nav-link active' : 'nav-link',
            },
            item.label
          )
        )
      )
    ),
    React.createElement(
      'main',
      { className: 'content-area' },
      React.createElement(
        'header',
        { className: 'content-header' },
        React.createElement(
          'div',
          null,
          React.createElement('span', { className: 'section-tag' }, userRole),
          React.createElement('h1', null, title)
        ),
        React.createElement('button', { type: 'button', className: 'primary-button' }, 'Export')
      ),
      React.createElement(
        'div',
        { className: 'hero-panel' },
        React.createElement('h2', null, subtitle),
        React.createElement(
          'p',
          null,
          'Academic support, intervention visibility, and action-oriented recommendations are centralized for decision-making.'
        )
      ),
      children
    )
  );
}

function MetricTile({ label, value }) {
  return React.createElement('div', { className: 'metric-card' }, `${label}: ${value}`);
}

export function StudentDashboardPage() {
  const metrics = [
    { label: 'Attendance', value: '82%' },
    { label: 'Average Score', value: '3.45 GPA' },
    { label: 'Assignments', value: '76%' },
    { label: 'Support Indicator', value: 'Moderate' },
  ];

  const trendData = [
    { month: 'Jan', score: 68 },
    { month: 'Feb', score: 72 },
    { month: 'Mar', score: 74 },
    { month: 'Apr', score: 79 },
    { month: 'May', score: 82 },
  ];

  const topicData = [
    { name: 'Algorithms', value: 32 },
    { name: 'DB', value: 24 },
    { name: 'Networks', value: 18 },
    { name: 'OOP', value: 26 },
  ];

  const recommendations = [
    'Follow up on the Data Structures assignment due tomorrow',
    'Review weak topic: Trees and Graph traversal',
    'Attend the Friday mentoring session on algorithms',
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Student Dashboard', subtitle: 'How am I doing? What needs attention? What should I do next?', navItems: baseNav, userRole: 'Student' },
    React.createElement(
      'div',
      { className: 'metric-grid' },
      ...metrics.map((metric) =>
        React.createElement(MetricTile, { key: metric.label, label: metric.label, value: metric.value })
      )
    ),
    React.createElement(
      'div',
      { className: 'detail-grid' },
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Performance trend'),
        React.createElement(
          'div',
          { style: { width: '100%', height: 220 } },
          React.createElement(
            ResponsiveContainer,
            { width: '100%', height: '100%' },
            React.createElement(
              AreaChart,
              { data: trendData },
              React.createElement('defs', null,
                React.createElement(
                  'linearGradient',
                  { id: 'studentTrend', x1: '0', x2: '0', y1: '0', y2: '1' },
                  React.createElement('stop', { offset: '5%', stopColor: '#2563eb', stopOpacity: 0.8 }),
                  React.createElement('stop', { offset: '95%', stopColor: '#2563eb', stopOpacity: 0.1 })
                )
              ),
              React.createElement(CartesianGrid, { strokeDasharray: '3 3' }),
              React.createElement(XAxis, { dataKey: 'month' }),
              React.createElement(YAxis, null),
              React.createElement(Tooltip, null),
              React.createElement(Area, { type: 'monotone', dataKey: 'score', stroke: '#2563eb', fill: 'url(#studentTrend)' })
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Weak topics'),
        React.createElement(
          'div',
          { style: { width: '100%', height: 220 } },
          React.createElement(
            ResponsiveContainer,
            { width: '100%', height: '100%' },
            React.createElement(
              PieChart,
              null,
              React.createElement(
                Pie,
                { data: topicData, dataKey: 'value', innerRadius: 45, outerRadius: 80, label: true },
                ...topicData.map((entry, index) =>
                  React.createElement(Cell, { key: `${entry.name}-${index}`, fill: palette[index % palette.length] })
                )
              ),
              React.createElement(Tooltip, null)
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'detail-grid', style: { marginTop: '18px' } },
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Recommended actions'),
        React.createElement(
          'ul',
          null,
          ...recommendations.map((item) => React.createElement('li', { key: item }, item))
        )
      ),
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Support indicator'),
        React.createElement(
          'ul',
          null,
          React.createElement('li', null, 'Attendance is below the configured threshold.'),
          React.createElement('li', null, 'Two assignments are still pending.'),
          React.createElement('li', null, 'Recent assessment scores are declining.')
        )
      )
    )
  );
}

export function FacultyDashboardPage() {
  const metrics = [
    { label: 'Students', value: '146' },
    { label: 'At Risk', value: '17' },
    { label: 'On Track', value: '89%' },
    { label: 'Pending Grading', value: '12' },
  ];

  const courseData = [
    { subject: 'CS101', performance: 82 },
    { subject: 'CS201', performance: 76 },
    { subject: 'DBMS', performance: 70 },
    { subject: 'AI', performance: 88 },
  ];

  const studentsAtRisk = [
    'Aisha Khan — Need attention in Data Structures',
    'David Singh — Attendance recovery plan',
    'Mina Patel — Quiz improvement follow-up',
  ];

  return React.createElement(
    DashboardShell,
    {
      title: 'Faculty Dashboard',
      subtitle: 'Course health, student needs attention, and intervention planning for assigned learners.',
      navItems: baseNav,
      userRole: 'Faculty',
    },
    React.createElement(
      'div',
      { className: 'metric-grid' },
      ...metrics.map((metric) =>
        React.createElement(MetricTile, { key: metric.label, label: metric.label, value: metric.value })
      )
    ),
    React.createElement(
      'div',
      { className: 'detail-grid' },
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Performance by course'),
        React.createElement(
          'div',
          { style: { width: '100%', height: 220 } },
          React.createElement(
            ResponsiveContainer,
            { width: '100%', height: '100%' },
            React.createElement(
              BarChart,
              { data: courseData },
              React.createElement(CartesianGrid, { strokeDasharray: '3 3' }),
              React.createElement(XAxis, { dataKey: 'subject' }),
              React.createElement(YAxis, null),
              React.createElement(Tooltip, null),
              React.createElement(Legend, null),
              React.createElement(Bar, { dataKey: 'performance', fill: '#7c3aed' })
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Students requiring attention'),
        React.createElement(
          'ul',
          null,
          ...studentsAtRisk.map((student) => React.createElement('li', { key: student }, student))
        )
      )
    )
  );
}

export function AdminDashboardPage() {
  const metrics = [
    { label: 'Students', value: '8420' },
    { label: 'Faculty', value: '312' },
    { label: 'Departments', value: '18' },
    { label: 'Intervention Rate', value: '12.4%' },
  ];

  const supportData = [
    { name: 'Low', value: 58 },
    { name: 'Moderate', value: 24 },
    { name: 'High', value: 18 },
  ];

  const departmentPerformance = [
    { department: 'CS', score: 84 },
    { department: 'Eng', score: 79 },
    { department: 'Business', score: 72 },
    { department: 'Arts', score: 81 },
  ];

  return React.createElement(
    DashboardShell,
    {
      title: 'Admin Dashboard',
      subtitle: 'University-level student success trends, institution metrics, and support effectiveness.',
      navItems: baseNav,
      userRole: 'Admin',
    },
    React.createElement(
      'div',
      { className: 'metric-grid' },
      ...metrics.map((metric) =>
        React.createElement(MetricTile, { key: metric.label, label: metric.label, value: metric.value })
      )
    ),
    React.createElement(
      'div',
      { className: 'detail-grid' },
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Support indicator distribution'),
        React.createElement(
          'div',
          { style: { width: '100%', height: 220 } },
          React.createElement(
            ResponsiveContainer,
            { width: '100%', height: '100%' },
            React.createElement(
              PieChart,
              null,
              React.createElement(
                Pie,
                { data: supportData, dataKey: 'value', nameKey: 'name', outerRadius: 80, label: true },
                ...supportData.map((entry, index) =>
                  React.createElement(Cell, { key: `${entry.name}-${index}`, fill: palette[index % palette.length] })
                )
              ),
              React.createElement(Tooltip, null),
              React.createElement(Legend, null)
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Department performance'),
        React.createElement(
          'div',
          { style: { width: '100%', height: 220 } },
          React.createElement(
            ResponsiveContainer,
            { width: '100%', height: '100%' },
            React.createElement(
              BarChart,
              { data: departmentPerformance },
              React.createElement(CartesianGrid, { strokeDasharray: '3 3' }),
              React.createElement(XAxis, { dataKey: 'department' }),
              React.createElement(YAxis, null),
              React.createElement(Tooltip, null),
              React.createElement(Bar, { dataKey: 'score', fill: '#10b981' })
            )
          )
        )
      )
    )
  );
}

const studentNavItems = [
  { label: 'Overview', href: '/student/dashboard' },
  { label: 'Courses', href: '/student/courses' },
  { label: 'Assignments', href: '/student/assignments' },
  { label: 'Quizzes', href: '/student/quizzes' },
  { label: 'Attendance', href: '/student/attendance' },
  { label: 'Performance', href: '/student/performance' },
  { label: 'Recommendations', href: '/student/recommendations' },
  { label: 'Planner', href: '/student/study-planner' },
  { label: 'Notifications', href: '/student/notifications' },
];

const facultyNavItems = [
  { label: 'Overview', href: '/faculty/dashboard' },
  { label: 'Courses', href: '/faculty/courses' },
  { label: 'Assignments', href: '/faculty/assignments' },
  { label: 'Quizzes', href: '/faculty/quizzes' },
  { label: 'Attendance', href: '/faculty/attendance' },
  { label: 'Students', href: '/faculty/students' },
  { label: 'Support', href: '/faculty/support' },
  { label: 'Interventions', href: '/faculty/interventions' },
  { label: 'Analytics', href: '/faculty/analytics' },
];

const adminNavItems = [
  { label: 'Overview', href: '/admin/dashboard' },
  { label: 'Students', href: '/admin/students' },
  { label: 'Faculty', href: '/admin/faculty' },
  { label: 'Departments', href: '/admin/departments' },
  { label: 'Courses', href: '/admin/courses' },
  { label: 'Semesters', href: '/admin/semesters' },
  { label: 'Analytics', href: '/admin/analytics' },
  { label: 'Support', href: '/admin/support' },
  { label: 'Interventions', href: '/admin/interventions' },
  { label: 'Settings', href: '/admin/settings' },
];

function PageTable({ columns, rows }) {
  return React.createElement(
    'div',
    { className: 'detail-card' },
    React.createElement(
      'table',
      { style: { width: '100%', borderCollapse: 'collapse' } },
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          ...columns.map((column) => React.createElement('th', { key: column, style: { textAlign: 'left', padding: '10px 8px', borderBottom: '1px solid #e5e7eb' } }, column))
        )
      ),
      React.createElement(
        'tbody',
        null,
        ...rows.map((row, rowIndex) =>
          React.createElement(
            'tr',
            { key: `${rowIndex}-${row[0]}` },
            ...row.map((cell, cellIndex) =>
              React.createElement(
                'td',
                { key: `${rowIndex}-${cellIndex}`, style: { padding: '10px 8px', borderBottom: '1px solid #f1f5f9' } },
                cell
              )
            )
          )
        )
      )
    )
  );
}

function SmallStatGrid({ items }) {
  return React.createElement(
    'div',
    { className: 'metric-grid' },
    ...items.map((item) => React.createElement(MetricTile, { key: item.label, label: item.label, value: item.value }))
  );
}

export function StudentProfilePage() {
  return React.createElement(
    DashboardShell,
    { title: 'Student Profile', subtitle: 'View your academic identity, course workload, and the latest support information.', navItems: studentNavItems, userRole: 'Student' },
    React.createElement(
      'div',
      { className: 'detail-grid' },
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Profile'),
        React.createElement('p', null, 'Name: Emma Johnson'),
        React.createElement('p', null, 'Email: student@edusmart.edu'),
        React.createElement('p', null, 'Department: Computer Science'),
        React.createElement('p', null, 'Semester: Fall 2026')
      ),
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Academic snapshot'),
        React.createElement('p', null, 'Current progress: 82% attendance'),
        React.createElement('p', null, 'Average score: 3.45 GPA'),
        React.createElement('p', null, 'Support indicator: Needs Attention'),
        React.createElement('p', null, 'Learning streak: 9 days')
      )
    )
  );
}

export function StudentCoursesPage() {
  const rows = [
    ['CS101', 'Data Structures', '92%', 'Active'],
    ['CS201', 'Algorithms', '78%', 'Active'],
    ['DBMS', 'Database Systems', '85%', 'Active'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'My Courses', subtitle: 'Track enrolled courses, weekly workload, and upcoming tasks.', navItems: studentNavItems, userRole: 'Student' },
    SmallStatGrid({ items: [{ label: 'Enrolled', value: '6' }, { label: 'Active', value: '4' }, { label: 'At Risk', value: '2' }] }),
    PageTable({ columns: ['Course', 'Title', 'Progress', 'Status'], rows })
  );
}

export function StudentAssignmentsPage() {
  const [assignments, setAssignments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get('/assignments')
      .then((res) => {
        if (!mounted) return;
        if (res.data && res.data.success) {
          setAssignments(res.data.data.assignments || []);
        } else {
          setError(res.data && res.data.message ? res.data.message : 'Unexpected response');
        }
      })
      .catch((err) => setError(err?.response?.data?.message || err.message))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const rows = assignments.map((a) => [
    a.course?.code || (a.course && a.course.title) || '—',
    a.title,
    a.dueDate ? new Date(a.dueDate).toLocaleDateString() : '—',
    React.createElement('a', { key: `submit-${a._id}`, href: `/student/assignments/${a._id}/submit` }, 'Submit'),
  ]);

  return React.createElement(
    DashboardShell,
    { title: 'Assignments', subtitle: 'See upcoming deadlines, submission status, and marks.', navItems: studentNavItems, userRole: 'Student' },
    SmallStatGrid({ items: [{ label: 'Open', value: assignments.length.toString() }, { label: 'Submitted', value: '—' }, { label: 'Graded', value: '—' }] }),
    loading ? React.createElement('p', null, 'Loading assignments...') : error ? React.createElement('p', null, `Error: ${error}`) : PageTable({ columns: ['Course', 'Assignment', 'Deadline', 'Action'], rows })
  );
}

export function StudentQuizzesPage() {
  const rows = [
    ['Algorithms', 'Quiz 5', '72%', 'Completed'],
    ['Data Structures', 'Topic Check', '61%', 'Needs Review'],
    ['DBMS', 'Normalization Quiz', '88%', 'Completed'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Quizzes', subtitle: 'Review quiz scores, weak topics, and practice recommendations.', navItems: studentNavItems, userRole: 'Student' },
    SmallStatGrid({ items: [{ label: 'Attempted', value: '8' }, { label: 'Average', value: '74%' }, { label: 'Weak Topic', value: 'Graphs' }] }),
    PageTable({ columns: ['Course', 'Quiz', 'Score', 'Status'], rows })
  );
}

export function StudentAttendancePage() {
  const rows = [
    ['CS101', '15/18', '83%', 'Below threshold'],
    ['CS201', '17/18', '94%', 'On track'],
    ['DBMS', '14/16', '88%', 'On track'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Attendance', subtitle: 'Review attendance records and identify class sessions that require attention.', navItems: studentNavItems, userRole: 'Student' },
    SmallStatGrid({ items: [{ label: 'Overall', value: '88%' }, { label: 'Present', value: '46' }, { label: 'Absent', value: '6' }] }),
    PageTable({ columns: ['Course', 'Classes', 'Attendance', 'Status'], rows })
  );
}

export function StudentPerformancePage() {
  const rows = [
    ['Algorithms', 'A-', '82', 'Improving'],
    ['Data Structures', 'B+', '76', 'Needs Review'],
    ['DBMS', 'A', '90', 'Strong'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Performance', subtitle: 'Track academic progress over time and compare course-level outcomes.', navItems: studentNavItems, userRole: 'Student' },
    SmallStatGrid({ items: [{ label: 'GPA', value: '3.45' }, { label: 'Trend', value: '+6%' }, { label: 'Weak Areas', value: '2' }] }),
    PageTable({ columns: ['Course', 'Letter Grade', 'Score', 'Trend'], rows })
  );
}

export function StudentRecommendationsPage() {
  const rows = [
    ['Data Structures', 'Review trees and graphs', 'Video + practice quiz', 'High'],
    ['Algorithms', 'Complete dynamic programming notes', 'Mini recap', 'Medium'],
    ['DBMS', 'Revisit normalization', 'Practice workbook', 'Medium'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Recommendations', subtitle: 'Follow targeted actions based on weak topics and recent performance.', navItems: studentNavItems, userRole: 'Student' },
    SmallStatGrid({ items: [{ label: 'Resources', value: '7' }, { label: 'Practice Sets', value: '3' }, { label: 'Priority', value: 'High' }] }),
    PageTable({ columns: ['Topic', 'Recommendation', 'Format', 'Priority'], rows })
  );
}

export function StudentStudyPlannerPage() {
  const rows = [
    ['Monday', 'Review graphs notes', '45 mins', 'Planned'],
    ['Wednesday', 'Practice recursion quiz', '30 mins', 'Planned'],
    ['Friday', 'Submit assignment draft', '60 mins', 'Priority'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Study Planner', subtitle: 'Prioritize assessments, weak topics, and upcoming assignments.', navItems: studentNavItems, userRole: 'Student' },
    SmallStatGrid({ items: [{ label: 'Hours', value: '9.5' }, { label: 'Tasks', value: '5' }, { label: 'Streak', value: '9 days' }] }),
    PageTable({ columns: ['Day', 'Focus', 'Time', 'Priority'], rows })
  );
}

export function StudentNotificationsPage() {
  const rows = [
    ['Assignment', 'Trees and Graphs due today', '5 minutes ago', 'Unread'],
    ['Support', 'Attendance below threshold', '1 hour ago', 'Unread'],
    ['Recommendation', 'Practice quiz unlocked', '2 hours ago', 'Read'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Notifications', subtitle: 'Respond to deadlines, alerts, and recommended learning actions.', navItems: studentNavItems, userRole: 'Student' },
    SmallStatGrid({ items: [{ label: 'Unread', value: '3' }, { label: 'Alerts', value: '2' }, { label: 'Updates', value: '7' }] }),
    PageTable({ columns: ['Type', 'Message', 'Time', 'Status'], rows })
  );
}

export function FacultyProfilePage() {
  return React.createElement(
    DashboardShell,
    { title: 'Faculty Profile', subtitle: 'Manage academic profile, teaching assignments, and office-hour information.', navItems: facultyNavItems, userRole: 'Faculty' },
    React.createElement(
      'div',
      { className: 'detail-grid' },
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Faculty details'),
        React.createElement('p', null, 'Name: Dr. Michael Lee'),
        React.createElement('p', null, 'Email: faculty@edusmart.edu'),
        React.createElement('p', null, 'Department: Engineering'),
        React.createElement('p', null, 'Courses assigned: 3')
      ),
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Teaching summary'),
        React.createElement('p', null, 'Students under supervision: 146'),
        React.createElement('p', null, 'Pending grading: 12'),
        React.createElement('p', null, 'Support interventions: 7 open'),
        React.createElement('p', null, 'Avg. course performance: 82%')
      )
    )
  );
}

export function FacultyCoursesPage() {
  const rows = [
    ['CS101', 'Data Structures', '146 students', 'Active'],
    ['CS201', 'Algorithms', '124 students', 'Active'],
    ['DBMS', 'Database Systems', '89 students', 'Active'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Courses Taught', subtitle: 'Access academic resources, intervention data, and assignment status across enrolled courses.', navItems: facultyNavItems, userRole: 'Faculty' },
    SmallStatGrid({ items: [{ label: 'Courses', value: '3' }, { label: 'Students', value: '146' }, { label: 'At Risk', value: '17' }] }),
    PageTable({ columns: ['Course', 'Title', 'Enrollment', 'Status'], rows })
  );
}

export function FacultyAssignmentsPage() {
  const [assignments, setAssignments] = React.useState([]);
  const [selectedAssignment, setSelectedAssignment] = React.useState(null);
  const [submissions, setSubmissions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get('/assignments')
      .then((res) => {
        if (!mounted) return;
        if (res.data && res.data.success) setAssignments(res.data.data.assignments || []);
        else setError(res.data && res.data.message ? res.data.message : 'Unexpected response');
      })
      .catch((err) => setError(err?.response?.data?.message || err.message))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const loadSubmissions = async (assignmentId) => {
    setError(null);
    setSubmissions([]);
    setSelectedAssignment(assignmentId);
    setLoading(true);

    try {
      const res = await api.get(`/submissions?assignment=${assignmentId}`);
      if (res.data && res.data.success) {
        setSubmissions(res.data.data.submissions || []);
      } else {
        setError(res.data && res.data.message ? res.data.message : 'Unexpected response');
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const assignmentRows = assignments.map((a) => [
    a.course?.code || (a.course && a.course.title) || '—',
    a.title,
    a.dueDate ? new Date(a.dueDate).toLocaleDateString() : '—',
    React.createElement('button', { key: `load-${a._id}`, onClick: () => loadSubmissions(a._id), className: 'link-button' }, 'View submissions'),
  ]);

  const submissionRows = submissions.map((s) => [
    s.student?.name || (s.student && s.student.email) || '—',
    s.assignment?.title || '—',
    s.submittedAt ? new Date(s.submittedAt).toLocaleString() : '—',
    React.createElement('a', { key: `grade-${s._id}`, href: `/faculty/submissions/${s._id}/grade` }, 'Grade'),
  ]);

  return React.createElement(
    DashboardShell,
    { title: 'Assignments', subtitle: 'Create and manage assignments, grading queues, and student submission activity.', navItems: facultyNavItems, userRole: 'Faculty' },
    SmallStatGrid({ items: [{ label: 'Assignments', value: assignments.length.toString() }, { label: 'Selected', value: selectedAssignment || '—' }, { label: 'Submissions', value: submissions.length.toString() }] }),
    loading ? React.createElement('p', null, 'Loading...') : PageTable({ columns: ['Course', 'Assignment', 'Deadline', 'Action'], rows: assignmentRows }),
    selectedAssignment && (error ? React.createElement('p', null, `Error: ${error}`) : PageTable({ columns: ['Student', 'Assignment', 'Submitted At', 'Action'], rows: submissionRows }))
  );
}

export function FacultyQuizzesPage() {
  const rows = [
    ['CS101', 'Topic Check 5', '72%', 'Published'],
    ['CS201', 'Algorithm Quiz', '81%', 'Published'],
    ['DBMS', 'Normalization Check', '67%', 'Draft'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Quizzes', subtitle: 'Create assessment items, review participation, and review item-level performance.', navItems: facultyNavItems, userRole: 'Faculty' },
    SmallStatGrid({ items: [{ label: 'Total', value: '11' }, { label: 'Participation', value: '88%' }, { label: 'Average', value: '74%' }] }),
    PageTable({ columns: ['Course', 'Quiz', 'Average', 'Status'], rows })
  );
}

export function FacultyAttendancePage() {
  const rows = [
    ['CS101', '04 Aug', '93%', 'Track'],
    ['CS201', '05 Aug', '87%', 'Monitor'],
    ['DBMS', '06 Aug', '90%', 'Track'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Attendance', subtitle: 'Record class attendance and identify students whose participation requires intervention.', navItems: facultyNavItems, userRole: 'Faculty' },
    SmallStatGrid({ items: [{ label: 'Classes', value: '24' }, { label: 'Absent', value: '12' }, { label: 'Alert', value: '5' }] }),
    PageTable({ columns: ['Course', 'Date', 'Average', 'Action'], rows })
  );
}

export function FacultyStudentsPage() {
  const rows = [
    ['Aisha Khan', 'CS101', 'Needs Attention', 'Attendance + low quiz score'],
    ['David Singh', 'CS201', 'Moderate', 'Assignment lag'],
    ['Mina Patel', 'DBMS', 'Low Risk', 'Stable trend'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Students', subtitle: 'Review registered students and identify those requiring academic support.', navItems: facultyNavItems, userRole: 'Faculty' },
    SmallStatGrid({ items: [{ label: 'Students', value: '146' }, { label: 'At Risk', value: '17' }, { label: 'Resolved', value: '9' }] }),
    PageTable({ columns: ['Student', 'Course', 'Status', 'Reason'], rows })
  );
}

export function FacultyStudentDetailPage() {
  return React.createElement(
    DashboardShell,
    { title: 'Student Detail', subtitle: 'Review student performance history, support indicators, and intervention record.', navItems: facultyNavItems, userRole: 'Faculty' },
    React.createElement(
      'div',
      { className: 'detail-grid' },
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Student profile'),
        React.createElement('p', null, 'Name: Aisha Khan'),
        React.createElement('p', null, 'Course: CS101'),
        React.createElement('p', null, 'Attendance: 62%'),
        React.createElement('p', null, 'Quiz average: 48%')
      ),
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Support reasons'),
        React.createElement('ul', null,
          React.createElement('li', null, 'Attendance below configured threshold'),
          React.createElement('li', null, 'Multiple assignments incomplete'),
          React.createElement('li', null, 'Recent assessment performance declining')
        )
      )
    )
  );
}

export function FacultySupportPage() {
  const rows = [
    ['Aisha Khan', 'High', 'Attendance + quiz risk', 'Needs outreach'],
    ['David Singh', 'Medium', 'Assignment backlog', 'Mentoring plan'],
    ['Mina Patel', 'Low', 'Stable trend', 'Monitor'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Support Center', subtitle: 'View explainable support indicators and assign follow-up actions for students.', navItems: facultyNavItems, userRole: 'Faculty' },
    SmallStatGrid({ items: [{ label: 'High', value: '5' }, { label: 'Moderate', value: '8' }, { label: 'Low', value: '12' }] }),
    PageTable({ columns: ['Student', 'Level', 'Reason', 'Action'], rows })
  );
}

export function FacultyInterventionsPage() {
  const rows = [
    ['Aisha Khan', 'Contacted student', 'Open', '2026-08-10'],
    ['David Singh', 'Recommended materials', 'In progress', '2026-08-11'],
    ['Mina Patel', 'Follow-up required', 'Resolved', '2026-08-08'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Interventions', subtitle: 'Record faculty notes, action plans, and follow-up status for students requiring support.', navItems: facultyNavItems, userRole: 'Faculty' },
    SmallStatGrid({ items: [{ label: 'Open', value: '4' }, { label: 'In Progress', value: '6' }, { label: 'Resolved', value: '9' }] }),
    PageTable({ columns: ['Student', 'Action', 'Status', 'Follow-up'], rows })
  );
}

export function FacultyAnalyticsPage() {
  const rows = [
    ['CS101', '82%', '76%', '12'],
    ['CS201', '79%', '74%', '9'],
    ['DBMS', '90%', '88%', '5'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Faculty Analytics', subtitle: 'Analyze assignment completion, quiz participation, and course health.', navItems: facultyNavItems, userRole: 'Faculty' },
    SmallStatGrid({ items: [{ label: 'Assignments', value: '76%' }, { label: 'Quiz Participation', value: '88%' }, { label: 'Avg Performance', value: '82%' }] }),
    PageTable({ columns: ['Course', 'Performance', 'Quiz Participation', 'Support Alerts'], rows })
  );
}

export function FacultyNotificationsPage() {
  const rows = [
    ['Announcement', 'Submission guidelines updated', '5 mins ago', 'Unread'],
    ['Alert', 'Three students require follow-up', '1 hr ago', 'Unread'],
    ['Reminder', 'Office hours rescheduled', '2 hrs ago', 'Read'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Faculty Notifications', subtitle: 'Review student alerts, intervention updates, and course announcements.', navItems: facultyNavItems, userRole: 'Faculty' },
    SmallStatGrid({ items: [{ label: 'Unread', value: '4' }, { label: 'Alerts', value: '3' }, { label: 'Announcements', value: '5' }] }),
    PageTable({ columns: ['Type', 'Message', 'Time', 'Status'], rows })
  );
}

export function AdminStudentsPage() {
  const rows = [
    ['Emma Johnson', 'CS101', 'Student', 'Needs Attention'],
    ['Nora Smith', 'CS201', 'Student', 'On Track'],
    ['Arjun Das', 'DBMS', 'Student', 'Improving'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Students', subtitle: 'Monitor learner activity, university enrollment, and support needs.', navItems: adminNavItems, userRole: 'Admin' },
    SmallStatGrid({ items: [{ label: 'Students', value: '8420' }, { label: 'New', value: '192' }, { label: 'At Risk', value: '443' }] }),
    PageTable({ columns: ['Student', 'Course', 'Role', 'Status'], rows })
  );
}

export function AdminFacultyPage() {
  const rows = [
    ['Dr. Michael Lee', 'Engineering', 'Faculty', 'Active'],
    ['Prof. Anita Roy', 'Computer Science', 'Faculty', 'Active'],
    ['Dr. Hassan Ali', 'Business', 'Faculty', 'Active'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Faculty', subtitle: 'Manage staff contact records, teaching assignments, and departmental responsibilities.', navItems: adminNavItems, userRole: 'Admin' },
    SmallStatGrid({ items: [{ label: 'Faculty', value: '312' }, { label: 'Active', value: '289' }, { label: 'Need Review', value: '14' }] }),
    PageTable({ columns: ['Faculty', 'Department', 'Role', 'Status'], rows })
  );
}

export function AdminDepartmentsPage() {
  const rows = [
    ['Computer Science', 'CS', '15 courses', 'Active'],
    ['Engineering', 'ENG', '18 courses', 'Active'],
    ['Business', 'BUS', '9 courses', 'Active'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Departments', subtitle: 'View institutional departments, course volume, and leadership assignments.', navItems: adminNavItems, userRole: 'Admin' },
    SmallStatGrid({ items: [{ label: 'Departments', value: '18' }, { label: 'Courses', value: '144' }, { label: 'New', value: '12' }] }),
    PageTable({ columns: ['Department', 'Code', 'Courses', 'Status'], rows })
  );
}

export function AdminCoursesPage() {
  const rows = [
    ['CS101', 'Data Structures', 'Computer Science', 'Active'],
    ['CS201', 'Algorithms', 'Computer Science', 'Active'],
    ['ENG201', 'Applied Math', 'Engineering', 'Draft'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Courses', subtitle: 'Manage academic offerings, capacity, and cross-department delivery.', navItems: adminNavItems, userRole: 'Admin' },
    SmallStatGrid({ items: [{ label: 'Courses', value: '144' }, { label: 'Active', value: '122' }, { label: 'Draft', value: '9' }] }),
    PageTable({ columns: ['Code', 'Title', 'Department', 'Status'], rows })
  );
}

export function AdminSemestersPage() {
  const rows = [
    ['Fall 2026', '2026-2027', '01 Aug', 'Active'],
    ['Spring 2026', '2025-2026', '01 Jan', 'Closed'],
    ['Summer 2026', '2025-2026', '15 Jun', 'Active'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Semesters', subtitle: 'Track academic terms, active cycle status, and planning intervals.', navItems: adminNavItems, userRole: 'Admin' },
    SmallStatGrid({ items: [{ label: 'Semesters', value: '6' }, { label: 'Active', value: '2' }, { label: 'Upcoming', value: '1' }] }),
    PageTable({ columns: ['Name', 'Academic Year', 'Start', 'Status'], rows })
  );
}

export function AdminAnalyticsPage() {
  const rows = [
    ['Department', 'Computer Science', '84%', '12.4%'],
    ['Department', 'Engineering', '79%', '16.2%'],
    ['Department', 'Business', '73%', '18.8%'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Analytics', subtitle: 'Monitor university trends, department performance, and support indicator distribution.', navItems: adminNavItems, userRole: 'Admin' },
    SmallStatGrid({ items: [{ label: 'Avg Attendance', value: '81%' }, { label: 'Avg Performance', value: '78%' }, { label: 'Intervention Rate', value: '12.4%' }] }),
    PageTable({ columns: ['Dimension', 'Area', 'Average', 'Support Rate'], rows })
  );
}

export function AdminSupportPage() {
  const rows = [
    ['High need', '443 students', 'Support review required', 'Escalated'],
    ['Moderate', '612 students', 'Faculty follow-up', 'Tracked'],
    ['Low', '2204 students', 'Routine monitoring', 'Stable'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Support Overview', subtitle: 'Monitor aggregate support levels and identify intervention priorities across the university.', navItems: adminNavItems, userRole: 'Admin' },
    SmallStatGrid({ items: [{ label: 'High', value: '443' }, { label: 'Moderate', value: '612' }, { label: 'Low', value: '2204' }] }),
    PageTable({ columns: ['Level', 'Students', 'Flow', 'Status'], rows })
  );
}

export function AdminInterventionsPage() {
  const rows = [
    ['Aisha Khan', 'Faculty outreach', 'Open', '2026-08-12'],
    ['David Singh', 'Mentoring plan', 'In progress', '2026-08-11'],
    ['Mina Patel', 'Follow-up required', 'Resolved', '2026-08-08'],
  ];

  return React.createElement(
    DashboardShell,
    { title: 'Interventions', subtitle: 'Track intervention workflow status and outcomes across the university.', navItems: adminNavItems, userRole: 'Admin' },
    SmallStatGrid({ items: [{ label: 'Open', value: '42' }, { label: 'In Progress', value: '61' }, { label: 'Resolved', value: '87' }] }),
    PageTable({ columns: ['Student', 'Action', 'Status', 'Updated'], rows })
  );
}

export function AdminSettingsPage() {
  return React.createElement(
    DashboardShell,
    { title: 'System Settings', subtitle: 'Configure institutional support thresholds, platform policies, and account controls.', navItems: adminNavItems, userRole: 'Admin' },
    React.createElement(
      'div',
      { className: 'detail-grid' },
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Support settings'),
        React.createElement('p', null, 'Attendance threshold: 60%'),
        React.createElement('p', null, 'Assignment threshold: 60%'),
        React.createElement('p', null, 'Quiz threshold: 50%')
      ),
      React.createElement(
        'div',
        { className: 'detail-card' },
        React.createElement('h3', null, 'Platform policy'),
        React.createElement('p', null, 'Access control: Role-based + student self access'),
        React.createElement('p', null, 'Privacy mode: Aggregate analytics preferred'),
        React.createElement('p', null, 'Support indications: Explainable, non-deterministic labels only')
      )
    )
  );
}
