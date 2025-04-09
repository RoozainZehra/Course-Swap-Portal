import React from 'react';

const SwapRequestsList = ({ requests }) => {
  return (
    <div className="swap-requests-container">
      {requests.map((request, index) => (
        <div key={index} className="request-item">
          <div className="request-details">
            <p className="course-name">{request.offeredCourse}</p>
            <p className="swap-details">Looking to swap for {request.desiredCourse}</p>
            <p className="reason">{request.reason}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwapRequestsList;
