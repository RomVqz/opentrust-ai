import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={
            localStorage.getItem('token')
              ? <DashboardPage />
              : <Navigate to="/" replace />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;