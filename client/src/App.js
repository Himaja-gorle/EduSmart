import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/student/StudentDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return React.createElement(
    AuthProvider,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: '/login', element: React.createElement(Login) }),
      React.createElement(Route, { path: '/register', element: React.createElement(Register) }),
      React.createElement(Route, {
        element: React.createElement(ProtectedRoute, { allowedRoles: ['student'] }),
        children: React.createElement(Route, { path: '/student/dashboard', element: React.createElement(StudentDashboard) })
      }),
      React.createElement(Route, {
        element: React.createElement(ProtectedRoute, { allowedRoles: ['faculty'] }),
        children: React.createElement(Route, { path: '/faculty/dashboard', element: React.createElement(FacultyDashboard) })
      }),
      React.createElement(Route, {
        element: React.createElement(ProtectedRoute, { allowedRoles: ['admin'] }),
        children: React.createElement(Route, { path: '/admin/dashboard', element: React.createElement(AdminDashboard) })
      }),
      React.createElement(Route, { path: '/', element: React.createElement(Navigate, { to: '/login', replace: true }) }),
      React.createElement(Route, { path: '*', element: React.createElement(Navigate, { to: '/login', replace: true }) })
    )
  );
}

export default App;
