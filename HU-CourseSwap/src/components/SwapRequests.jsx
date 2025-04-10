import React from 'react';

const SwapRequests = () => {
  return (
    <div className="swap-requests">
      
      {/* Section Header */}
      <h2 className="section-title">Available Swap Requests</h2>

      {/* Cards Container */}
      <div className="swap-card-container">
        <div className="swap-card">
          <h4>Requested: OOP → DSA</h4>
          <p>Status: Pending</p>
        </div>
        <div className="swap-card">
          <h4>Requested: Calculus I → DSA</h4>
          <p>Status: Pending</p>
        </div>
        <div className="swap-card">
          <h4>Requested: EM → DSA</h4>
          <p>Status: Pending</p>
        </div>
        <div className="swap-card">
          <h4>Requested: DBMS → Networks</h4>
          <p>Status: Approved</p>
        </div>
      </div>
    </div>
  );
};

export default SwapRequests;
