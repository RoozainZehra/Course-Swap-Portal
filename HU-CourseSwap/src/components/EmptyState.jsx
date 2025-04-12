import React from 'react';

const EmptyState = () => {
  return (
    <div className="empty-state" id="my-requests-empty-state">
      <div className="empty-state-icon">📋</div>    
      <div className="empty-state-text">
        Nothing to Show.
      </div>
      <div>Move back to the main dashboard to see available Requests.</div>
    </div>
  );
};

export default EmptyState;
