const validateRegisterInput = (data) => {
  const errors = {};

  if (!data.name || data.name.trim() === '') errors.name = 'Name is required';
  if (!data.email || data.email.trim() === '') errors.email = 'Email is required';
  if (!data.password || data.password.length < 6) errors.password = 'Password must be at least 6 characters';

  if (data.role && !['student', 'faculty', 'admin'].includes(data.role)) {
    errors.role = 'Role must be student, faculty, or admin';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

const validateLoginInput = (data) => {
  const errors = {};

  if (!data.email || data.email.trim() === '') errors.email = 'Email is required';
  if (!data.password) errors.password = 'Password is required';

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = {
  validateRegisterInput,
  validateLoginInput
};
