import connectDB from './config/db.js';
import User from './models/User.js';
import Department from './models/Department.js';
import Semester from './models/Semester.js';
import Course from './models/Course.js';
import Enrollment from './models/Enrollment.js';
import Assignment from './models/Assignment.js';
import Submission from './models/Submission.js';

async function seed() {
  try {
    await connectDB();

    console.log('Clearing collections (users, departments, semesters, courses, enrollments, assignments, submissions)');
    await Promise.all([
      User.deleteMany({}),
      Department.deleteMany({}),
      Semester.deleteMany({}),
      Course.deleteMany({}),
      Enrollment.deleteMany({}),
      Assignment.deleteMany({}),
      Submission.deleteMany({}),
    ]);

    console.log('Creating users...');
    const admin = await User.create({ name: 'Admin User', email: 'admin@edusmart.test', password: 'Password123', role: 'admin' });
    const faculty = await User.create({ name: 'Dr. Michael Lee', email: 'faculty1@edusmart.test', password: 'Password123', role: 'faculty', department: 'Engineering' });

    const students = [];
    for (let i = 1; i <= 5; i++) {
      const s = await User.create({ name: `Student ${i}`, email: `student${i}@edusmart.test`, password: 'Password123', role: 'student' });
      students.push(s);
    }

    console.log('Creating department and semester...');
    const department = await Department.create({ name: 'Computer Science', code: 'CS', description: 'Computer Science department', head: faculty._id });

    const now = new Date();
    const semester = await Semester.create({ name: 'Fall 2026', academicYear: '2026-2027', startDate: new Date(now.getFullYear(), 7, 1), endDate: new Date(now.getFullYear(), 11, 31), isActive: true });

    console.log('Creating course...');
    const course = await Course.create({ code: 'CS101', title: 'Data Structures', description: 'Intro to data structures', department: department._id, semester: semester._id, instructor: faculty._id, credits: 3, status: 'active' });

    console.log('Enrolling students...');
    for (const s of students) {
      await Enrollment.create({ student: s._id, course: course._id, semester: semester._id, status: 'active', attendanceRate: Math.floor(70 + Math.random() * 30) });
    }

    console.log('Creating assignment...');
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7); // due in 7 days
    const assignment = await Assignment.create({ course: course._id, title: 'Trees and Graphs', description: 'Implement tree and graph traversals', dueDate, maxMarks: 100, type: 'homework', createdBy: faculty._id });

    console.log('Creating a sample submission for student1...');
    const submission = await Submission.create({ assignment: assignment._id, student: students[0]._id, course: course._id, submittedAt: new Date(), status: 'submitted', content: 'My solution code included', fileUrl: '', score: 0, feedback: '' });

    console.log('Seed complete. Summary:');
    console.log(`Admin: ${admin.email}`);
    console.log(`Faculty: ${faculty.email}`);
    console.log('Students:', students.map((s) => s.email).join(', '));
    console.log(`Department: ${department.name} (${department.code})`);
    console.log(`Semester: ${semester.name}`);
    console.log(`Course: ${course.code} - ${course.title}`);
    console.log(`Assignment: ${assignment.title} (due ${assignment.dueDate.toISOString()})`);
    console.log(`Sample submission id: ${submission._id}`);

    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

seed();
