const { requireAuth, requireRole } = require('./auth');

const protect = requireAuth;
const authorize = (...roles) => {
  return requireRole(...roles);
};

module.exports = {
  protect,
  authorize
};
