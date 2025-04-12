import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/signIn.jsx';
import ProfilePage from './pages/profile.jsx';
import Dashboard from './pages/dashboard.jsx';
import RequestsPage from './pages/requests.jsx';
import AddRequest from './pages/addRequests.jsx';  // Import AddRequest page
import NotificationsPage from './pages/Notifications.jsx';

import './App.css';  // Assuming you have global styles
// import './styles/dashboard.css'; // or wherever your CSS is

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-requests" element={<RequestsPage />} />
        <Route path="/add-request" element={<AddRequest />} />
        <Route path="/notifications" element={<NotificationsPage />} />        
      </Routes>
    </Router>
  );
};

export default App;
