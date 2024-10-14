import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MeetingDocuments from './components/MeetingDocuments';
import VehicleManagement from './components/VehicleManagement';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/meeting-documents"
            element={user?.permissions.includes('meeting_documents') ? <MeetingDocuments /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/vehicle-management"
            element={user?.permissions.includes('vehicle_management') ? <VehicleManagement /> : <Navigate to="/dashboard" />}
          />
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;