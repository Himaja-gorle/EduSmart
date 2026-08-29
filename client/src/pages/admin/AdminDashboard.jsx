import React from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Institutional Analytics & Administration</h1>
          <p className="text-sm text-slate-400">Logged in as Administrator ({user?.email})</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 uppercase font-semibold">Total Departments</span>
            <p className="text-2xl font-bold text-indigo-400 mt-1">6</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 uppercase font-semibold">Active Faculty</span>
            <p className="text-2xl font-bold text-indigo-400 mt-1">42</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 uppercase font-semibold">Total Students</span>
            <p className="text-2xl font-bold text-indigo-400 mt-1">1,280</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 uppercase font-semibold">Overall Support Indicator</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">92% Stable</p>
          </div>
        </div>
      </div>
    </div>
  );
}
