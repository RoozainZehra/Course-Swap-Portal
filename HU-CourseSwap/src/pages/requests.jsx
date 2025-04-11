import React from 'react';
import Sidebar from '../components/Sidebar';
import EmptyState from '../components/EmptyState';
import '../styles/requests.css';

const RequestsPage = () => {
  return (
    <div className="requests-layout">
      <Sidebar />

      <div className="requests-main">
        <h1 className="section-title">Your Active Requests</h1>
        <div className="requests-content">
          {/* <div className="empty-state-wrapper">
            <EmptyState />
          </div> */}
          <div className="swap-card-container">
            <div className="swap-card">
              <h4>Requested: OOP → DSA</h4>
              <p>Status: Pending</p>
              <button className="swap-card-btn1">Delete Request</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
