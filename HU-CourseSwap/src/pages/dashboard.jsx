import React from 'react';
import Sidebar from '../components/Sidebar';
import WelcomeBar from '../components/WelcomeBar';
import SwapRequests from '../components/SwapRequests';
import SearchBar from '../components/SearchBar.jsx'; 
import '../styles/dashboard.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <Sidebar />
      
      {/* Main content wrapper with left padding on larger screens */}
      <div className="dashboard-content max-w-4xl mx-auto px-4 pt-6 md:pl-[270px]">
        
        {/* Top section: Search and Welcome */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          
          <WelcomeBar />
          <SearchBar />
        </div>

        {/* Swap Requests */}
        <SwapRequests />
      </div>
    </div>
  );
};

export default DashboardPage;
