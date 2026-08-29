import React, { useEffect, useState } from 'react';
import { checkHealth } from './services/api';

export default function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkHealth()
      .then(data => setHealth(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
        <h1 className="text-2xl font-bold text-indigo-400 mb-2">EduSmart Platform</h1>
        <p className="text-sm text-slate-400 mb-6">Phase 1 Architecture Setup</p>
        
        <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Backend Connection Status</h2>
          {error ? (
            <div className="text-red-400 text-sm font-medium">Disconnected: {error}</div>
          ) : health ? (
            <div className="space-y-1 text-sm">
              <div className="text-emerald-400 font-semibold">{health.message}</div>
              <div className="text-slate-400">Database: <span className="text-slate-200">{health.data?.database}</span></div>
              <div className="text-slate-400">Environment: <span className="text-slate-200">{health.data?.environment}</span></div>
            </div>
          ) : (
            <div className="text-amber-400 text-sm animate-pulse">Checking API status...</div>
          )}
        </div>
      </div>
    </div>
  );
}
