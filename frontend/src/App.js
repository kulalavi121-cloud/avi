import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import './index.css';

// Lazy load pages for performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Trends = lazy(() => import('./pages/Trends'));
const Alerts = lazy(() => import('./pages/Alerts'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Router>
      <div className="layout">
        <Sidebar />

        <main className="main-content custom-scrollbar">
          <Suspense fallback={
            <div className="flex h-full items-center justify-center">
              <div className="text-gradient text-xl animate-pulse">Loading Application...</div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </main>

        <BottomNav />
      </div>
    </Router>
  );
}

export default App;