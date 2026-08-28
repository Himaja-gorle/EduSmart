import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';

export default function ScreenLibraryPage() {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const response = await api.get('/screens');
        setScreens(response.data.screens || []);
      } catch (error) {
        console.error('Unable to fetch screens', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScreens();
  }, []);

  const groupedScreens = useMemo(() => {
    const groups = {};

    screens.forEach((screen) => {
      const key = screen.category || 'general';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(screen);
    });

    return groups;
  }, [screens]);

  if (loading) {
    return React.createElement(
      'div',
      { className: 'page-shell' },
      React.createElement(
        'div',
        { className: 'status-card wide-card' },
        React.createElement('h2', null, 'Loading screen library...')
      )
    );
  }

  const moduleSections = Object.entries(groupedScreens).map(([category, items]) =>
    React.createElement(
      'section',
      { key: category, className: 'module-section' },
      React.createElement('h3', null, category),
      React.createElement(
        'div',
        { className: 'card-grid' },
        ...items.map((screen) =>
          React.createElement(
            Link,
            {
              key: screen.slug,
              to: `/screens/${screen.slug}`,
              className: 'screen-card',
            },
            React.createElement(
              'div',
              { className: 'card-topline' },
              React.createElement('span', null, screen.category),
              React.createElement('span', { className: 'status-pill' }, 'Live')
            ),
            React.createElement('h4', null, screen.title),
            React.createElement('p', null, screen.summary)
          )
        )
      )
    )
  );

  return React.createElement(
    'div',
    { className: 'shell-layout' },
    React.createElement(
      'aside',
      { className: 'sidebar' },
      React.createElement(
        'div',
        { className: 'brand-block' },
        React.createElement('div', { className: 'brand-mark' }, 'E'),
        React.createElement(
          'div',
          null,
          React.createElement('h2', null, 'EduSmart'),
          React.createElement('small', null, 'MERN Platform')
        )
      ),
      React.createElement(
        'nav',
        { className: 'nav-stack' },
        React.createElement(Link, { to: '/dashboard', className: 'nav-link' }, 'Dashboard'),
        React.createElement(Link, { to: '/screens', className: 'nav-link active' }, 'Screen Library'),
        React.createElement(Link, { to: '/login', className: 'nav-link' }, 'Logout')
      )
    ),
    React.createElement(
      'main',
      { className: 'content-area' },
      React.createElement(
        'header',
        { className: 'content-header' },
        React.createElement(
          'div',
          null,
          React.createElement('span', { className: 'section-tag' }, 'Module library'),
          React.createElement('h1', null, 'Complete Frontend Screen Catalog')
        ),
        React.createElement('button', { className: 'primary-button' }, 'Add module')
      ),
      React.createElement(
        'div',
        { className: 'hero-panel' },
        React.createElement(
          'div',
          null,
          React.createElement('h2', null, 'All student success screens in one platform'),
          React.createElement(
            'p',
            null,
            'Browse the complete EduSmart workflow from login to course analytics, interventions, recommendations, and admin controls.'
          )
        )
      ),
      React.createElement('div', { className: 'screen-grid' }, ...moduleSections)
    )
  );
}
