import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api.js';

export default function ScreenPage() {
  const { slug } = useParams();
  const [screen, setScreen] = useState(null);
  const [navigation, setNavigation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScreen = async () => {
      try {
        const [screenResponse, listResponse] = await Promise.all([
          api.get(`/screens/${slug || 'student_dashboard'}`),
          api.get('/screens'),
        ]);

        setScreen(screenResponse.data);
        setNavigation(listResponse.data.screens || []);
      } catch (error) {
        console.error('Unable to fetch screen details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScreen();
  }, [slug]);

  if (loading) {
    return React.createElement(
      'div',
      { className: 'page-shell' },
      React.createElement(
        'div',
        { className: 'status-card wide-card' },
        React.createElement('h2', null, 'Loading screen...')
      )
    );
  }

  if (!screen) {
    return React.createElement(
      'div',
      { className: 'page-shell' },
      React.createElement(
        'div',
        { className: 'status-card wide-card' },
        React.createElement('h2', null, 'Screen not found'),
        React.createElement(Link, { to: '/screens' }, 'Back to library')
      )
    );
  }

  const navItems = navigation.slice(0, 12).map((item) =>
    React.createElement(
      Link,
      {
        key: item.slug,
        to: `/screens/${item.slug}`,
        className: `nav-link ${item.slug === screen.slug ? 'active' : ''}`,
      },
      item.title
    )
  );

  const metricCards = (screen.stats || []).map((item, index) =>
    React.createElement(
      'div',
      { key: `${screen.slug}-metric-${index}`, className: 'metric-card' },
      React.createElement('span', null, item)
    )
  );

  const detailCards = (screen.sections || []).map((section, idx) =>
    React.createElement(
      'div',
      { key: `${screen.slug}-section-${idx}`, className: 'detail-card' },
      React.createElement('h3', null, section.title),
      React.createElement(
        'ul',
        null,
        ...(section.items || []).map((item, itemIndex) =>
          React.createElement('li', { key: `${screen.slug}-${section.title}-${itemIndex}` }, item)
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
          React.createElement('small', null, 'Screen View')
        )
      ),
      React.createElement(
        'nav',
        { className: 'nav-stack small-nav' },
        React.createElement(Link, { to: '/screens', className: 'nav-link' }, 'Back to Library'),
        ...navItems
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
          React.createElement('span', { className: 'section-tag' }, screen.category),
          React.createElement('h1', null, screen.title)
        ),
        React.createElement(Link, { to: '/screens', className: 'primary-button' }, 'View all screens')
      ),
      React.createElement(
        'div',
        { className: 'hero-panel' },
        React.createElement(
          'div',
          null,
          React.createElement('h2', null, screen.summary),
          React.createElement(
            'p',
            null,
            'Role-aware academic workflows designed for a full-stack student success platform.'
          )
        )
      ),
      React.createElement('section', { className: 'metric-grid' }, ...metricCards),
      React.createElement('section', { className: 'detail-grid' }, ...detailCards)
    )
  );
}
