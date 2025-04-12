import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/signIn.jsx';
import ProfilePage from './pages/profile.jsx';
import Dashboard from './pages/dashboard.jsx';
import RequestsPage from './pages/requests.jsx';
import AddRequest from './pages/addRequests.jsx';  // Import AddRequest page
import SignUp from './pages/Signup';
import EditProfilePage from './pages/EditProfilePage'

import './App.css';  // Assuming you have global styles
// import './styles/dashboard.css'; // or wherever your CSS is

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-requests" element={<RequestsPage />} />
        <Route path="/add-request" element={<AddRequest />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
