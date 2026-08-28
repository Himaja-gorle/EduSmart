import React from 'react';
import api from '../services/api.js';

export function StudentSubmitAssignmentPage() {
  const [assignmentId, setAssignmentId] = React.useState('');
  const [content, setContent] = React.useState('');
  const [fileUrl, setFileUrl] = React.useState('');
  const [message, setMessage] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!assignmentId) return setMessage('Assignment ID is required');

    try {
      const res = await api.post(`/assignments/${assignmentId}/submit`, { content, fileUrl });
      if (res.data && res.data.success) {
        setMessage('Submission saved');
      } else {
        setMessage(res.data && res.data.message ? res.data.message : 'Unexpected response');
      }
    } catch (err) {
      setMessage(err?.response?.data?.message || err.message);
    }
  };

  return React.createElement(
    'div',
    { className: 'basic-page' },
    React.createElement('h2', null, 'Submit Assignment'),
    React.createElement(
      'form',
      { onSubmit: handleSubmit, style: { maxWidth: 720 } },
      React.createElement('label', null, 'Assignment ID'),
      React.createElement('input', { value: assignmentId, onChange: (e) => setAssignmentId(e.target.value), placeholder: 'assignment id', className: 'input' }),
      React.createElement('label', null, 'Content / Notes'),
      React.createElement('textarea', { value: content, onChange: (e) => setContent(e.target.value), placeholder: 'Write any notes for the instructor', className: 'textarea' }),
      React.createElement('label', null, 'File URL (optional)'),
      React.createElement('input', { value: fileUrl, onChange: (e) => setFileUrl(e.target.value), placeholder: 'https://... or storage path', className: 'input' }),
      React.createElement('div', { style: { marginTop: 12 } }, React.createElement('button', { type: 'submit', className: 'primary-button' }, 'Submit')),
      message && React.createElement('p', { style: { marginTop: 12 } }, message)
    )
  );
}

export function FacultyGradeSubmissionPage() {
  const [submissionId, setSubmissionId] = React.useState('');
  const [score, setScore] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [message, setMessage] = React.useState(null);

  const handleGrade = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!submissionId) return setMessage('Submission ID is required');

    try {
      const res = await api.put(`/submissions/${submissionId}/grade`, { score, feedback });
      if (res.data && res.data.success) {
        setMessage('Submission graded');
      } else {
        setMessage(res.data && res.data.message ? res.data.message : 'Unexpected response');
      }
    } catch (err) {
      setMessage(err?.response?.data?.message || err.message);
    }
  };

  return React.createElement(
    'div',
    { className: 'basic-page' },
    React.createElement('h2', null, 'Grade Submission'),
    React.createElement(
      'form',
      { onSubmit: handleGrade, style: { maxWidth: 720 } },
      React.createElement('label', null, 'Submission ID'),
      React.createElement('input', { value: submissionId, onChange: (e) => setSubmissionId(e.target.value), placeholder: 'submission id', className: 'input' }),
      React.createElement('label', null, 'Score'),
      React.createElement('input', { value: score, onChange: (e) => setScore(e.target.value), placeholder: 'numeric score', className: 'input' }),
      React.createElement('label', null, 'Feedback'),
      React.createElement('textarea', { value: feedback, onChange: (e) => setFeedback(e.target.value), placeholder: 'Write feedback for the student', className: 'textarea' }),
      React.createElement('div', { style: { marginTop: 12 } }, React.createElement('button', { type: 'submit', className: 'primary-button' }, 'Save grade')),
      message && React.createElement('p', { style: { marginTop: 12 } }, message)
    )
  );
}
