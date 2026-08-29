import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon, BookOpen } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <BookOpen className="h-6 w-6 text-indigo-400" />
        <span className="text-xl font-bold text-white tracking-wide">EduSmart</span>
      </div>

      {user && (
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm text-slate-300">
            <UserIcon className="h-4 w-4 text-indigo-400" />
            <span className="font-medium text-white">{user.name}</span>
            <span className="bg-slate-700 text-indigo-300 text-xs px-2 py-0.5 rounded-full capitalize">
              {user.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-sm text-slate-400 hover:text-red-400 transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}
