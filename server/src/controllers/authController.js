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
  id: user.id || user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  department: user.department,
});

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role = 'student', department } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Role must be one of: student, faculty, admin' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role,
      department: department ? department.trim() : undefined,
    });

    const token = buildToken(user);
    return res.status(201).json({ success: true, message: 'User registered successfully', token, user: normalizeUser(user) });
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
      if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const fallbackUser = demoUsers.find((entry) => entry.email.toLowerCase() === email.toLowerCase().trim());
      if (!fallbackUser) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      if (fallbackUser.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = buildToken(fallbackUser);
      return res.status(200).json({ success: true, message: 'Login successful', token, user: normalizeUser(fallbackUser) });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = buildToken(user);
    return res.status(200).json({ success: true, message: 'Login successful', token, user: normalizeUser(user) });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const safeUser = normalizeUser(user);
    return res.status(200).json({ success: true, message: 'Profile loaded', user: safeUser });
  } catch (error) {
    return res.status(200).json({ success: true, user: { ...req.user } });
  }
};
