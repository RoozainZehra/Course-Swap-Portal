import React from 'react';
import ProfileImage from './ProfileImage';  // Import the ProfileImage component
import ProfileDetails from './ProfileDetails';  // Import the ProfileDetails component

const ProfileCard = () => {
  return (
    <div className="profile-card">
      {/* Profile Image Component */}
      <ProfileImage />

      {/* Profile Details Component */}
      <ProfileDetails />
    </div>
  );
};

export default ProfileCard;
