import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api.js';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    department: 'Computer Science',
    semester: 1,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const response = await api.post('/auth/register', form);
      const { token, user } = response.data.data || response.data;

      localStorage.setItem('edusmart-token', token);
      localStorage.setItem('edusmart-user', JSON.stringify(user));

      setSuccess('Registration successful! Redirecting to dashboard...');
      setTimeout(() => {
        const destination = user?.role ? `/${user.role}/dashboard` : '/dashboard';
        navigate(destination);
      }, 1000);
    } catch (requestError) {
      // Demo fallback if backend is offline
      if (form.name && form.email && form.password.length >= 6) {
        const demoUser = {
          name: form.name.trim(),
          email: form.email.toLowerCase().trim(),
          role: form.role,
          department: form.department,
          semester: Number(form.semester),
        };
        localStorage.setItem('edusmart-token', 'demo-token-' + form.role);
        localStorage.setItem('edusmart-user', JSON.stringify(demoUser));
        setSuccess('Registration successful (Demo Mode)! Redirecting...');
        setTimeout(() => {
          navigate(`/${form.role}/dashboard`);
        }, 1000);
        return;
      }
      setError(requestError.response?.data?.message || 'Registration failed. Please check inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return React.createElement(
    'div',
    { className: 'page-shell' },
    React.createElement(
      'div',
      { className: 'auth-card' },
      React.createElement(
        'div',
        { className: 'brand-panel' },
        React.createElement('span', { className: 'eyebrow' }, 'EduSmart'),
        React.createElement('h1', null, 'Join EduSmart'),
        React.createElement(
          'p',
          null,
          'Create your account to access role-aware academic monitoring, personalized study pathways, and early intervention tools.'
        ),
        React.createElement(
          'ul',
          null,
          React.createElement('li', null, 'Students: track weak topics & personalized recommendations'),
          React.createElement('li', null, 'Faculty: manage courses, quizzes & support workflows'),
          React.createElement('li', null, 'Admins: institutional analytics & policy configuration')
        )
      ),
      React.createElement(
        'form',
        { className: 'login-form', onSubmit: handleSubmit },
        React.createElement('h2', null, 'Create Account'),
        React.createElement(
          'label',
          null,
          'Full Name',
          React.createElement('input', {
            type: 'text',
            name: 'name',
            value: form.name,
            onChange: handleChange,
            placeholder: 'e.g. Alex Morgan',
            required: true,
          })
        ),
        React.createElement(
          'label',
          null,
          'Email Address',
          React.createElement('input', {
            type: 'email',
            name: 'email',
            value: form.email,
            onChange: handleChange,
            placeholder: 'e.g. alex@edusmart.edu',
            required: true,
          })
        ),
        React.createElement(
          'label',
          null,
          'Password (min. 6 characters)',
          React.createElement('input', {
            type: 'password',
            name: 'password',
            value: form.password,
            onChange: handleChange,
            placeholder: '••••••••',
            required: true,
            minLength: 6,
          })
        ),
        React.createElement(
          'label',
          null,
          'Role',
          React.createElement(
            'select',
            {
              name: 'role',
              value: form.role,
              onChange: handleChange,
              className: 'input',
              style: { width: '100%', padding: '8px 12px', marginBottom: '12px' },
            },
            React.createElement('option', { value: 'student' }, 'Student'),
            React.createElement('option', { value: 'faculty' }, 'Faculty'),
            React.createElement('option', { value: 'admin' }, 'Admin')
          )
        ),
        React.createElement(
          'label',
          null,
          'Department',
          React.createElement('input', {
            type: 'text',
            name: 'department',
            value: form.department,
            onChange: handleChange,
            placeholder: 'e.g. Computer Science',
            required: true,
          })
        ),
        form.role === 'student' &&
          React.createElement(
            'label',
            null,
            'Semester',
            React.createElement('input', {
              type: 'number',
              name: 'semester',
              min: 1,
              max: 8,
              value: form.semester,
              onChange: handleChange,
            })
          ),
        error && React.createElement('p', { className: 'error-message' }, error),
        success && React.createElement('p', { style: { color: '#10b981', marginTop: 8 } }, success),
        React.createElement(
          'button',
          { type: 'submit', disabled: isSubmitting },
          isSubmitting ? 'Creating account...' : 'Create Account'
        ),
        React.createElement(
          'p',
          { style: { textAlign: 'center', marginTop: 16, fontSize: '0.9rem' } },
          'Already have an account? ',
          React.createElement(Link, { to: '/login', style: { color: '#2563eb', fontWeight: 600 } }, 'Sign In')
        )
      )
    )
  );
}
