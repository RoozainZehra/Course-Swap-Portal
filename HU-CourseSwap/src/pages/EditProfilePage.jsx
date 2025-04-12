import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';
import EditProfileCard from '../components/EditProfileCard';

const EditProfilePage = () => {
  const navigate = useNavigate();
  
  // Initialize with current user data
  const [userData, setUserData] = useState({
    name: 'Ali Ahmed',
    email: 'aaa12345@st.habib.edu.pk',
    phoneNumber: '0321-2345678',
    requests: 0,
  });

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving user data:', userData);
    // Navigate back to profile page after saving
    navigate('/profile');
  };

  const handleCancel = () => {
    // Navigate back to profile page without saving
    navigate('/profile');
  };

  const handleChange = (field, value) => {
    setUserData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  return (
    <div className="screen">
      <div className="profile-page">
        
        <main className="profile-content">
          <EditProfileCard userData={userData} onFieldChange={handleChange} />
        </main>
        
        <div className="footer">
          <button 
            className="action-btn save-btn" 
            onClick={handleSave}
          >
            Save Changes
          </button>
          <button 
            className="action-btn cancel-btn" 
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;