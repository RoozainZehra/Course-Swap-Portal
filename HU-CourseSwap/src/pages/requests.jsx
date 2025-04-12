import React from 'react';
// import Header from '../components/Header';  // Assuming you have a Header component
import EmptyState from '../components/EmptyState';  // New EmptyState component
import '../styles/requests.css';  // Importing the requests-specific CSS file

const RequestsPage = () => {
  return (
    <div className="screen" id="my-requests-screen">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <div className="main-content">
        <h1 className="section-title">Your Active Requests</h1>

        <div className="my-requests-container">
          {/* Empty State Component */}
          <EmptyState />
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
