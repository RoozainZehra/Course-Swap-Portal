import React from 'react';
import Sidebar from '../components/Sidebar';
import EmptyState from '../components/EmptyState';
import '../styles/Notifications.css'; // Reuse styling or replace if needed

const NotificationsPage = () => {
  return (
    <div className="requests-layout">
      <Sidebar />

      <div className="requests-main">
        <h1 className="section-title">Your Notifications</h1>
        <div className="requests-content">
            <div className="empty-state-wrapper">
                <EmptyState />
            </div> 
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
