import Department from '../models/Department.js';
import Semester from '../models/Semester.js';
import Course from '../models/Course.js';

export const listDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 }).populate('head', 'name email role');
    return res.status(200).json({ success: true, data: departments, message: 'Departments loaded successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to fetch departments', error: error.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { name, code, description, head } = req.body;

    if (!name || !code) {
      return res.status(400).json({ success: false, message: 'Department name and code are required' });
    }

    const department = await Department.create({
      name: String(name).trim(),
      code: String(code).trim().toUpperCase(),
      description: description || '',
      head: head || null,
    });

    return res.status(201).json({ success: true, message: 'Department created successfully', data: department });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create department', error: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('head', 'name email role');

    if (!updatedDepartment) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }

    return res.status(200).json({ success: true, message: 'Department updated successfully', data: updatedDepartment });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update department', error: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }

    return res.status(200).json({ success: true, message: 'Department deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to delete department', error: error.message });
  }
};

export const listSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find().sort({ startDate: -1 });
    return res.status(200).json({ success: true, data: semesters, message: 'Semesters loaded successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to fetch semesters', error: error.message });
  }
};

export const createSemester = async (req, res) => {
  try {
    const { name, academicYear, startDate, endDate, isActive } = req.body;

    if (!name || !academicYear || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'Semester name, academic year, start date, and end date are required' });
    }

    const semester = await Semester.create({
      name: String(name).trim(),
      academicYear: String(academicYear).trim(),
      startDate,
      endDate,
      isActive: Boolean(isActive),
    });

    return res.status(201).json({ success: true, message: 'Semester created successfully', data: semester });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create semester', error: error.message });
  }
};

export const updateSemester = async (req, res) => {
  try {
    const updatedSemester = await Semester.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSemester) {
      return res.status(404).json({ success: false, message: 'Semester not found' });
    }

    return res.status(200).json({ success: true, message: 'Semester updated successfully', data: updatedSemester });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update semester', error: error.message });
  }
};

export const deleteSemester = async (req, res) => {
  try {
    const semester = await Semester.findByIdAndDelete(req.params.id);

    if (!semester) {
      return res.status(404).json({ success: false, message: 'Semester not found' });
    }

    return res.status(200).json({ success: true, message: 'Semester deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to delete semester', error: error.message });
  }
};

export const listCourses = async (req, res) => {
  try {
    const { department, semester } = req.query;
    const filter = {};

    if (department) filter.department = department;
    if (semester) filter.semester = semester;

    const courses = await Course.find(filter)
      .populate('department', 'name code')
      .populate('semester', 'name academicYear')
      .populate('instructor', 'name email role')
      .sort({ title: 1 });

    return res.status(200).json({ success: true, data: courses, message: 'Courses loaded successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to fetch courses', error: error.message });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('department', 'name code')
      .populate('semester', 'name academicYear')
      .populate('instructor', 'name email role');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.status(200).json({ success: true, data: course, message: 'Course loaded successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to fetch course', error: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { code, title, description, department, semester, instructor, credits, capacity, schedule, status, tags } = req.body;

    if (!code || !title || !department || !semester || !instructor) {
      return res.status(400).json({ success: false, message: 'Course code, title, department, semester, and instructor are required' });
    }

    const course = await Course.create({
      code: String(code).trim().toUpperCase(),
      title: String(title).trim(),
      description: description || '',
      department,
      semester,
      instructor,
      credits: credits || 3,
      capacity: capacity || 60,
      schedule: schedule || '',
      status: status || 'draft',
      tags: tags || [],
    });

    const populatedCourse = await Course.findById(course._id)
      .populate('department', 'name code')
      .populate('semester', 'name academicYear')
      .populate('instructor', 'name email role');

    return res.status(201).json({ success: true, message: 'Course created successfully', data: populatedCourse });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create course', error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const updates = req.body;
    const course = await Course.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })
      .populate('department', 'name code')
      .populate('semester', 'name academicYear')
      .populate('instructor', 'name email role');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.status(200).json({ success: true, message: 'Course updated successfully', data: course });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update course', error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to delete course', error: error.message });
  }
};

export default {
  listDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  listSemesters,
  createSemester,
  updateSemester,
  deleteSemester,
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
