import React from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-sm text-slate-400">Track your academic progress, tasks, and weak topics.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 uppercase font-semibold">Attendance</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">84%</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 uppercase font-semibold">Course Average</span>
            <p className="text-2xl font-bold text-indigo-400 mt-1">78%</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 uppercase font-semibold">Pending Tasks</span>
            <p className="text-2xl font-bold text-amber-400 mt-1">2 Deadlines</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 uppercase font-semibold">Support Indicator</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">Good Standing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
