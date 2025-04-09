import React from 'react';

const EmptyState = () => {
  return (
    <div className="empty-state" id="my-requests-empty-state">
      <div className="empty-state-icon">📋</div>    
      <div className="empty-state-text">
        You haven't made any swap requests yet
      </div>
      <div>Create a swap request from the main dashboard</div>
    </div>
  );
};

export default EmptyState;
