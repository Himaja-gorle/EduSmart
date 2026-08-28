import jwt from 'jsonwebtoken';

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

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token expired or invalid' });
  }
};

export const requireRole = (roles) => (req, res, next) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (!req.user || !allowedRoles.includes(req.user.role)) {
    const requiredRoles = allowedRoles.join(', ');
    return res.status(403).json({ success: false, message: `Access denied. Required role(s): ${requiredRoles}.` });
  }

  next();
};

export const requireOwnership = (ownerField = 'userId') => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  if (req.user.role === 'admin') {
    return next();
  }

  const sourceValues = [
    req.params?.[ownerField],
    req.params?.id,
    req.body?.[ownerField],
    req.body?.userId,
    req.query?.[ownerField],
  ].filter(Boolean);

  const identityValue = sourceValues[0];
  const currentUserId = req.user.id || req.user._id;

  if (!identityValue) {
    return res.status(403).json({ success: false, message: 'Resource ownership is required for this action.' });
  }

  if (String(currentUserId) !== String(identityValue)) {
    return res.status(403).json({ success: false, message: 'You do not have permission to access this resource.' });
  }

  next();
};
