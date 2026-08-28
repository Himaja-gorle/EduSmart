import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/dashboard');
        setDashboard(response.data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load dashboard');
      }
    };

    fetchDashboard();
  }, []);

  if (error) {
    return React.createElement(
      'div',
      { className: 'page-shell' },
      React.createElement(
        'div',
        { className: 'status-card' },
        React.createElement('h2', null, 'Error'),
        React.createElement('p', null, error)
      )
    );
  }

  if (!dashboard) {
    return React.createElement(
      'div',
      { className: 'page-shell' },
      React.createElement(
        'div',
        { className: 'status-card' },
        React.createElement('h2', null, 'Loading dashboard...')
      )
    );
  }

  const { user, summary } = dashboard;

  const statCards = Object.entries(summary).map(([key, value]) =>
    React.createElement(
      'div',
      { key, className: 'stat-card' },
      React.createElement('span', null, key.replace(/([A-Z])/g, ' $1').trim()),
      React.createElement('strong', null, value)
    )
  );

  const indicatorRows = (dashboard.indicators || []).map((indicator) =>
    React.createElement(
      'li',
      { key: indicator.label },
      React.createElement(
        'div',
        null,
        React.createElement('strong', null, indicator.label),
        React.createElement('small', null, indicator.trend)
      ),
      React.createElement('span', null, indicator.value)
    )
  );

  const interventionRows = (dashboard.interventions || []).map((item) =>
    React.createElement(
      'li',
      { key: item.title },
      React.createElement(
        'div',
        null,
        React.createElement('strong', null, item.title),
        React.createElement('small', null, item.detail)
      ),
      React.createElement('span', null, item.status)
    )
  );

  const notificationRows = (dashboard.notifications || []).map((notification) =>
    React.createElement(
      'li',
      { key: notification.title },
      React.createElement(
        'div',
        null,
        React.createElement('strong', null, notification.title),
        React.createElement('small', null, notification.detail)
      ),
      React.createElement('span', null, notification.time)
    )
  );

  return React.createElement(
    'div',
    { className: 'dashboard-shell' },
    React.createElement(
      'aside',
      { className: 'dashboard-sidebar' },
      React.createElement(
        'div',
        { className: 'brand-block' },
        React.createElement('div', { className: 'brand-mark' }, 'E'),
        React.createElement(
          'div',
          null,
          React.createElement('h2', null, 'EduSmart'),
          React.createElement('small', null, 'Analytics Pro')
        )
      ),
      React.createElement(
        'nav',
        { className: 'nav-stack' },
        React.createElement('a', { href: '#', className: 'nav-link active' }, 'Overview'),
        React.createElement('a', { href: '#', className: 'nav-link' }, 'Students'),
        React.createElement('a', { href: '#', className: 'nav-link' }, 'Intervention'),
        React.createElement('a', { href: '#', className: 'nav-link' }, 'Analytics')
      )
    ),
    React.createElement(
      'main',
      { className: 'dashboard-content' },
      React.createElement(
        'header',
        { className: 'dashboard-topbar' },
        React.createElement(
          'div',
          null,
          React.createElement('span', { className: 'section-tag' }, user.role),
          React.createElement('h1', null, 'Welcome, ', user.name)
        ),
        React.createElement(
          'div',
          { className: 'topbar-actions' },
          React.createElement('button', { className: 'secondary-btn' }, 'Export'),
          React.createElement(
            'button',
            {
              className: 'logout-button',
              onClick: () => {
                localStorage.removeItem('edusmart-token');
                localStorage.removeItem('edusmart-user');
                window.location.href = '/';
              },
            },
            'Log out'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'dashboard-hero' },
        React.createElement(
          'div',
          null,
          React.createElement('p', { className: 'hero-label' }, 'Academic health overview'),
          React.createElement('h2', null, 'AI-led student support and early intervention')
        ),
        React.createElement('button', { className: 'primary-button' }, 'Quick Action')
      ),
      React.createElement('section', { className: 'stats-grid' }, ...statCards),
      React.createElement(
        'section',
        { className: 'panel-grid' },
        React.createElement(
          'div',
          { className: 'panel-card' },
          React.createElement('h3', null, 'Support indicators'),
          React.createElement('ul', { className: 'list-stack' }, ...indicatorRows)
        ),
        React.createElement(
          'div',
          { className: 'panel-card' },
          React.createElement('h3', null, 'Intervention actions'),
          React.createElement('ul', { className: 'list-stack' }, ...interventionRows)
        )
      ),
      React.createElement(
        'section',
        { className: 'panel-card full-width' },
        React.createElement('h3', null, 'Notifications'),
        React.createElement('ul', { className: 'list-stack' }, ...notificationRows)
      )
    )
  );
}
