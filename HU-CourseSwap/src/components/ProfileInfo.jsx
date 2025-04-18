import React from 'react';
import DetailItem from './DetailItem';

const ProfileDetails = ({ userData }) => {
  return (
    <div className="profile-details">
      <DetailItem title="Name" value={userData.name} />
      <DetailItem title="Email" value={userData.email} />
      <DetailItem title="Phone Number" value={userData.phoneNumber} />
      <DetailItem title="Your requests" value={userData.requests} />
    </div>
  );
};

export default ProfileDetails;