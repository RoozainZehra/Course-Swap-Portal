import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import Footer from '../components/ProfileFooter';
import '../styles/profile.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const userData = {
    name: 'Ali Ahmed',
    email: 'aaa12345@st.habib.edu.pk',
    phoneNumber: '0321-2345678',
    requests: 0,
  };

  return (
    <div className="screen">
      <div className="profile-page">
        <div className="navigation-buttons">
          <button onClick={() => navigate('/dashboard')}>Home</button>
          <button onClick={() => navigate('/my-requests')}>See Requests</button>
        </div>
        
        <main className="profile-content">
          <ProfileCard userData={userData} />
        </main>
        
        <Footer 
          onEditProfile={() => navigate('/edit-profile')}
          onLogout={() => navigate('/login')} 
        />
      </div>
    </div>
  );
};

export default ProfilePage;