import React from 'react';
import ProfileImage from './ProfileAvatar';
import ProfileDetails from './ProfileInfo';

const ProfileCard = ({ userData }) => {
  return (
    <div className="profile-card">
      <ProfileImage src={userData.profileImage} />
      <ProfileDetails userData={userData} />
    </div>
  );
};

export default ProfileCard;