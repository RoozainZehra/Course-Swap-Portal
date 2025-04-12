import React from 'react';
import EditableDetailItem from './EditableDetailItem.jsx';
import DetailItem from './DetailItem';

const EditProfileDetails = ({ userData, onFieldChange }) => {
  return (
    <div className="profile-details">
      <EditableDetailItem 
        title="Name" 
        value={userData.name} 
        onChange={(value) => onFieldChange('name', value)} 
      />
      <EditableDetailItem 
        title="Email" 
        value={userData.email} 
        onChange={(value) => onFieldChange('email', value)} 
      />
      <EditableDetailItem 
        title="Phone Number" 
        value={userData.phoneNumber} 
        onChange={(value) => onFieldChange('phoneNumber', value)} 
      />
      {/* Requests field is not editable */}
      <DetailItem title="Your requests" value={userData.requests} />
    </div>
  );
};

export default EditProfileDetails;