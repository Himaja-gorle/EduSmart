import React from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

export default function FacultyDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Faculty Portal — {user?.name}</h1>
          <p className="text-sm text-slate-400">Course analytics, early intervention indicators, and grading.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 uppercase font-semibold">Assigned Courses</span>
            <p className="text-2xl font-bold text-indigo-400 mt-1">3 Courses</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 uppercase font-semibold">Students Needing Support</span>
            <p className="text-2xl font-bold text-red-400 mt-1">4 Students</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 uppercase font-semibold">Pending Submissions</span>
            <p className="text-2xl font-bold text-amber-400 mt-1">12 Papers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
