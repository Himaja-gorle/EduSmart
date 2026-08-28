import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

const demoAccounts = [
  { email: 'student@edusmart.edu', password: 'student123', role: 'student' },
  { email: 'faculty@edusmart.edu', password: 'faculty123', role: 'faculty' },
  { email: 'admin@edusmart.edu', password: 'admin123', role: 'admin' },
];

function DemoAccount({ account, onSelect }) {
  return React.createElement(
    'div',
    {
      key: account.email,
      className: 'demo-account',
      style: { cursor: 'pointer' },
      onClick: () => onSelect && onSelect(account),
      title: 'Click to select this account',
    },
    React.createElement('span', null, account.email),
    React.createElement('code', null, account.password)
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: 'student@edusmart.edu',
    password: 'student123',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSelectDemo = (account) => {
    setForm({ email: account.email, password: account.password });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await api.post('/auth/login', form);
      const { token, user } = response.data;

      localStorage.setItem('edusmart-token', token);
      localStorage.setItem('edusmart-user', JSON.stringify(user));

      const destination = user?.role ? `/${user.role}/dashboard` : '/dashboard';
      navigate(destination);
    } catch (requestError) {
      const matchingDemo = demoAccounts.find(
        (acc) => acc.email.toLowerCase() === form.email.trim().toLowerCase() && acc.password === form.password
      );

      if (matchingDemo) {
        const demoUser = {
          name: matchingDemo.role.charAt(0).toUpperCase() + matchingDemo.role.slice(1) + ' User',
          email: matchingDemo.email,
          role: matchingDemo.role,
        };
        localStorage.setItem('edusmart-token', 'demo-token-' + matchingDemo.role);
        localStorage.setItem('edusmart-user', JSON.stringify(demoUser));
        navigate(`/${matchingDemo.role}/dashboard`);
        return;
      }

      setError(requestError.response?.data?.message || 'Login failed. Please check your credentials.');
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
        React.createElement('h1', null, 'Academic Early Intervention'),
        React.createElement(
          'p',
          null,
          'Predict student risk, support at-risk learners, and improve academic outcomes with a role-aware student success platform.'
        ),
        React.createElement(
          'ul',
          null,
          React.createElement('li', null, 'Student success monitoring'),
          React.createElement('li', null, 'Faculty intervention workflows'),
          React.createElement('li', null, 'Admin threshold governance')
        ),
        React.createElement(
          'div',
          { className: 'demo-box' },
          React.createElement('strong', null, 'Demo accounts'),
          ...demoAccounts.map((account) =>
            React.createElement(DemoAccount, { key: account.email, account, onSelect: handleSelectDemo })
          )
        )
      ),
      React.createElement(
        'form',
        { className: 'login-form', onSubmit: handleSubmit },
        React.createElement('h2', null, 'Welcome back'),
        React.createElement(
          'label',
          null,
          'Email',
          React.createElement('input', {
            type: 'email',
            name: 'email',
            value: form.email,
            onChange: handleChange,
            required: true,
          })
        ),
        React.createElement(
          'label',
          null,
          'Password',
          React.createElement('input', {
            type: 'password',
            name: 'password',
            value: form.password,
            onChange: handleChange,
            required: true,
          })
        ),
        error && React.createElement('p', { className: 'error-message' }, error),
        React.createElement(
          'button',
          { type: 'submit', disabled: isSubmitting },
          isSubmitting ? 'Signing in...' : 'Sign in'
        )
      )
    )
  );
}
