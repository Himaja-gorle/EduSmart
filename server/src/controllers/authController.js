import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const demoUsers = [
  {
    id: 'student-1',
    name: 'Emma Johnson',
    email: 'student@edusmart.edu',
    password: 'student123',
    role: 'student',
    department: 'Computer Science',
  },
  {
    id: 'faculty-1',
    name: 'Dr. Michael Lee',
    email: 'faculty@edusmart.edu',
    password: 'faculty123',
    role: 'faculty',
    department: 'Engineering',
  },
  {
    id: 'admin-1',
    name: 'Sarah Patel',
    email: 'admin@edusmart.edu',
    password: 'admin123',
    role: 'admin',
    department: 'Academic Affairs',
  },
];

const allowedRoles = ['student', 'faculty', 'admin'];

const getJwtSecret = () => {
  const envSecret = process.env.JWT_SECRET;

  if (envSecret && envSecret.trim()) {
    return envSecret;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET is required in production');
  }

  return 'dev-secret';
};

const buildToken = (user) =>
  jwt.sign(
    { id: user.id || user._id.toString(), name: user.name, email: user.email, role: user.role },
    getJwtSecret(),
    { expiresIn: '7d' }
  );

const normalizeUser = (user) => ({
  id: user.id || user._id?.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  department: user.department || 'General Studies',
  semester: user.semester || 1,
  studentId: user.studentId || '',
  profileImage: user.profileImage || '',
});

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role = 'student', department, semester, studentId } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Role must be one of: student, faculty, admin' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address format' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase().trim() });
    if (userExists) {
      return res.status(409).json({ success: false, message: 'User with this email already exists' });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role,
      department: department ? department.trim() : 'General Studies',
      semester: semester ? Number(semester) : 1,
      studentId: studentId ? studentId.trim() : undefined,
    });

    const token = buildToken(user);
    const safeUser = normalizeUser(user);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: safeUser,
      data: { token, user: safeUser },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    let user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      const fallbackUser = demoUsers.find((entry) => entry.email.toLowerCase() === email.toLowerCase().trim());
      if (!fallbackUser || fallbackUser.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const token = buildToken(fallbackUser);
      const safeUser = normalizeUser(fallbackUser);
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: safeUser,
        data: { token, user: safeUser },
      });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = buildToken(user);
    const safeUser = normalizeUser(user);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: safeUser,
      data: { token, user: safeUser },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();

    if (!user) {
      const fallbackUser = demoUsers.find((entry) => entry.id === req.user.id);
      if (fallbackUser) {
        const safeUser = normalizeUser(fallbackUser);
        return res.status(200).json({ success: true, message: 'Profile loaded', user: safeUser, data: safeUser });
      }
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const safeUser = normalizeUser(user);
    return res.status(200).json({ success: true, message: 'Profile loaded', user: safeUser, data: safeUser });
  } catch (error) {
    return res.status(200).json({ success: true, user: { ...req.user }, data: { ...req.user } });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, department, semester, profileImage } = req.body;
    const updateData = {};

    if (name) updateData.name = name.trim();
    if (department) updateData.department = department.trim();
    if (semester) updateData.semester = Number(semester);
    if (profileImage !== undefined) updateData.profileImage = profileImage;

    const user = await User.findByIdAndUpdate(req.user.id, { $set: updateData }, { new: true, runValidators: true }).lean();

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const safeUser = normalizeUser(user);
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: safeUser,
      data: safeUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating profile', error: error.message });
  }
};
