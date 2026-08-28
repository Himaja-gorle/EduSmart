const screenCatalog = [
  { slug: 'student_dashboard', title: 'Student Dashboard', category: 'student', summary: 'Core academic overview for active learners.', stats: ['GPA 3.45', 'Attendance 82%', 'Assignments 76%'], cards: ['Recommended study plan', 'Upcoming deadlines', 'Risk indicators'] },
  { slug: 'faculty_dashboard', title: 'Faculty Dashboard', category: 'faculty', summary: 'Monitor class performance and intervention workflow.', stats: ['124 students', '17 at-risk', '8 interventions'], cards: ['Course engagement', 'Mentoring queue', 'Faculty actions'] },
  { slug: 'admin_dashboard', title: 'Admin Dashboard', category: 'admin', summary: 'University-wide success analytics and governance.', stats: ['8,420 students', '12.4% risk', '91.2% retention'], cards: ['Institutional trends', 'Department alerts', 'Resource planning'] },
  { slug: 'student_success_dashboard', title: 'Student Success Dashboard', category: 'student', summary: 'View student growth and support interventions.', stats: ['Trends +12%', 'Support score 78', 'Recovery 6/9'], cards: ['Recovery map', 'Advisor notes', 'Milestones'] },
  { slug: 'faculty_intervention_dashboard', title: 'Faculty Intervention Dashboard', category: 'faculty', summary: 'Coordinate outreach and academic support follow-ups.', stats: ['Counseling 14', 'Tasks 26', 'Response 91%'], cards: ['Intervention list', 'Follow-up queue', 'Suggested actions'] },
  { slug: 'university_analytics_overview', title: 'University Analytics Overview', category: 'admin', summary: 'High-level institutional performance and KPI metrics.', stats: ['Enrollment 94%', 'Retention 91%', 'Completion 88%'], cards: ['Department view', 'Active alerts', 'Research insights'] },
  { slug: 'university_success_intervention_analytics', title: 'University Success Intervention Analytics', category: 'admin', summary: 'Track interventions across all programs.', stats: ['8 departments', '270 actions', '7.6% uplift'], cards: ['Intervention flow', 'Success rates', 'Allocation plan'] },
  { slug: 'course_catalog', title: 'Course Catalog', category: 'academic', summary: 'Explore learning opportunities and registration data.', stats: ['42 courses', '18 electives', '9 new modules'], cards: ['Catalog filters', 'Weekly schedule', 'Enrollment data'] },
  { slug: 'course_details', title: 'Course Details', category: 'academic', summary: 'Review course structure, outcomes, and teaching plan.', stats: ['4 modules', '12 lessons', '87% completion'], cards: ['Outcomes', 'Schedule', 'Assessment plan'] },
  { slug: 'course_assignments_control', title: 'Assignment Management', category: 'academic', summary: 'Control assignment lifecycle and evaluation status.', stats: ['39 active tasks', '8 due soon', '3 late'], cards: ['Task pipeline', 'Submission tracking', 'Feedback queue'] },
  { slug: 'assignment_submission', title: 'Assignment Submission', category: 'academic', summary: 'Submit and track academic work.', stats: ['5 tasks', '2 pending', '1 reviewed'], cards: ['Upload files', 'Checklist', 'Submission status'] },
  { slug: 'grading_feedback', title: 'Grading & Feedback', category: 'academic', summary: 'Review rubric scores and improvement recommendations.', stats: ['92 average', '4 feedback notes', '3 resubmits'], cards: ['Nested insights', 'Rubrics', 'Action steps'] },
  { slug: 'attendance_course_analytics', title: 'Attendance & Course Analytics', category: 'academic', summary: 'Monitor engagement and attendance by course.', stats: ['Attendance 81%', 'Participation 74%', 'Missed 9'], cards: ['Trend chart', 'Course health', 'Absence watchlist'] },
  { slug: 'course_health_intervention_center', title: 'Course Health Intervention Center', category: 'academic', summary: 'Diagnose course risk and support needs.', stats: ['3 critical', '5 medium', '9 stable'], cards: ['Health score', 'Intervention plan', 'Faculty actions'] },
  { slug: 'enrollment_management', title: 'Enrollment Management', category: 'academic', summary: 'Track admissions, capacity, and enrollment flow.', stats: ['1,240 seats', '840 enrolled', '91% fill rate'], cards: ['Capacity', 'Waitlist', 'Alerts'] },
  { slug: 'quiz_creator', title: 'Quiz Creator', category: 'assessment', summary: 'Create topic-specific assessments quickly.', stats: ['12 questions', '3 modules', '2 timed sets'], cards: ['Question bank', 'Rules', 'Publish flow'] },
  { slug: 'quiz_attempt', title: 'Quiz Attempt', category: 'assessment', summary: 'Manage test attempts and progress.', stats: ['Attempt 2/3', 'Score 74%', 'Time 18m'], cards: ['Question review', 'Progress', 'Results summary'] },
  { slug: 'quiz_results', title: 'Quiz Results', category: 'assessment', summary: 'Review scores and learning gaps.', stats: ['Average 74%', 'Below 60% 4', 'Improvement +8%'], cards: ['Trend by topic', 'Action plan', 'Peer comparison'] },
  { slug: 'smart_study_planner', title: 'Smart Study Planner', category: 'planning', summary: 'Build a guided learning schedule.', stats: ['6 study sessions', '2 deep work blocks', '3 revision tasks'], cards: ['Weekly plan', 'Priority list', 'Calendar'] },
  { slug: 'academic_precision', title: 'Academic Precision', category: 'planning', summary: 'Precision support based on learning scores and attendance.', stats: ['Precision 89%', 'Topic index 7', 'Risk net 12'], cards: ['Signals', 'Calibration', 'Recommendations'] },
  { slug: 'personalized_recommendations', title: 'Personalized Recommendations', category: 'planning', summary: 'Surface targeted content by weak areas.', stats: ['7 content picks', '4 skill gaps', '3 follow-ups'], cards: ['Learning path', 'Saved content', 'Priority topics'] },
  { slug: 'ai_learning_assistant', title: 'AI Learning Assistant', category: 'assistant', summary: 'Ask questions and generate learning support prompts.', stats: ['12 prompts', '3 active sessions', '9 saved notes'], cards: ['Chat history', 'Study scratchpad', 'Tutor prompts'] },
  { slug: 'learning_materials_repository', title: 'Learning Materials Repository', category: 'resources', summary: 'Find course materials, notes, and resources.', stats: ['728 files', '42 active tags', '8 new'], cards: ['Material library', 'Topic tags', 'Saved notes'] },
  { slug: 'document_viewer', title: 'Document Viewer', category: 'resources', summary: 'Read course guides and lecture documents.', stats: ['3 docs open', '2 bookmarks', '1 highlight set'], cards: ['Page view', 'Highlights', 'Annotations'] },
  { slug: 'my_courses', title: 'My Courses', category: 'student', summary: 'Overview of current course enrollments.', stats: ['6 courses', '2 in progress', '1 pending'], cards: ['Course card list', 'Progress', 'Next action'] },
  { slug: 'my_assignments', title: 'My Assignments', category: 'student', summary: 'Check due dates and assignment statuses.', stats: ['9 total', '3 late', '1 graded'], cards: ['Assignment feed', 'Due soon', 'Past submissions'] },
  { slug: 'my_bookmarks', title: 'My Bookmarks', category: 'student', summary: 'Saved resources and learning material.', stats: ['18 saved', '7 unread', '2 highlighted'], cards: ['Bookmarks', 'Saved tags', 'Reading list'] },
  { slug: 'notifications_activity_hub', title: 'Notifications & Activity Hub', category: 'student', summary: 'See new alerts and recent academic activity.', stats: ['11 alerts', '5 unread', '4 actions'], cards: ['Inbox', 'Events', 'Updates'] },
  { slug: 'user_profile', title: 'User Profile', category: 'profile', summary: 'Manage personal profile and preferences.', stats: ['Profile 92%', 'Preferences set', '2FA enabled'], cards: ['Identity', 'Role settings', 'Security'] },
  { slug: 'registration', title: 'Registration', category: 'student', summary: 'Enroll in courses and view registration details.', stats: ['4 selected', '2 waitlist', '1 conflict'], cards: ['Course selection', 'Schedule', 'Validation'] },
  { slug: 'achievements_gamification', title: 'Achievements & Gamification', category: 'student', summary: 'Celebrate progression and milestones.', stats: ['12 badges', '5 streaks', '2 rank ups'], cards: ['Achievements', 'Challenges', 'Rewards'] },
  { slug: 'support_engine_threshold_configuration', title: 'Support Engine Threshold Configuration', category: 'admin', summary: 'Customise academic intervention logic.', stats: ['Attendance 75%', 'Assignments 80%', 'Quiz threshold 60%'], cards: ['Threshold tuning', 'Rules', 'Scenario preview'] },
  { slug: 'login', title: 'Login', category: 'auth', summary: 'Sign in to the platform.', stats: ['3 roles', 'Secure auth', 'Single sign-on'], cards: ['Student', 'Faculty', 'Admin'] },
];

const screenMap = Object.fromEntries(screenCatalog.map((screen) => [screen.slug, screen]));

const defaultScreen = screenCatalog[0];

export const getScreensList = (_, res) => {
  res.json({
    screens: screenCatalog.map(({ slug, title, category, summary }) => ({ slug, title, category, summary })),
  });
};

export const getScreenDetails = (req, res) => {
  const slug = req.params.slug || 'student_dashboard';
  const screen = screenMap[slug] || defaultScreen;

  res.json({
    ...screen,
    sections: [
      {
        title: 'Overview',
        items: screen.cards,
      },
      {
        title: 'Highlights',
        items: ['Actionable insights', 'Real-time monitoring', 'Support workflow'],
      },
    ],
  });
};
