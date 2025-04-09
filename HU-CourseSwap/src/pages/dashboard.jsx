// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';  // Import Routes and Route for internal routing
// import Header from '../components/Header.jsx';  
// import SearchBar from '../components/SearchBar.jsx';  
// import CourseSwap from '../components/CourseSwap.jsx';  
// import SwapRequestsList from '../components/SwapRequestsList.jsx';  
// import SwapCard from '../components/SwapCard.jsx';  
// import CourseSwapRequestForm from '../components/CourseSwapRequestForm.jsx';  
// import Signup from '../components/Signup.jsx';  

// const Dashboard = () => {
//   return (
//     <div id="course-swap-screen" className="screen">
//       {/* Header Component */}
//       <Header />

//       {/* Dashboard Navigation Links */}
//       <div className="dashboard-nav">
//         <Link to="/dashboard/courseswap" className="nav-link">Course Swap</Link>
//         <Link to="/dashboard/requests" className="nav-link">Swap Requests</Link>
//         <Link to="/dashboard/signup" className="nav-link">Signup</Link>
//       </div>

//       {/* Swap Requests Container */}
//       <div className="swap-requests-container">
//         {/* Search and Add Request Section */}
//         <div className="search-add-container">
//           {/* Search Bar Component */}
//           <SearchBar />

//           {/* Add Request Button */}
//           <button className="add-request-btn">
//             <span>+</span>
//             <span>Add Request</span>
//           </button>
//         </div>

//         {/* Internal Routing for Dashboard Sections */}
//         <Routes>
//           <Route path="courseswap" element={<CourseSwap />} />  {/* Route for CourseSwap */}
//           <Route path="requests" element={<SwapRequestsList />} />  {/* Route for SwapRequests */}
//           <Route path="signup" element={<Signup />} />  {/* Route for Signup */}
//           <Route path="*" element={<CourseSwap />} />  {/* Default route */}
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import SearchBar from '../components/SearchBar.jsx';
import CourseSwap from '../components/CourseSwap.jsx';
import SwapRequestsList from '../components/SwapRequestsList.jsx';
import Signup from '../components/Signup.jsx';

const Dashboard = () => {
  const location = useLocation();
  
  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname.includes(path) ? 'active' : '';
  };

  return (
    <div id="course-swap-screen" className="screen">
      {/* Header Component */}
      <Header />

      <div className="main-container">
        {/* Dashboard Navigation Tabs */}
        <div className="dashboard-nav">
          <Link 
            to="/dashboard/courseswap" 
            className={`nav-link ${isActive('courseswap')}`}
          >
            Course Swap
          </Link>
          <Link 
            to="/dashboard/requests" 
            className={`nav-link ${isActive('requests')}`}
          >
            My Swap Requests
          </Link>
          <Link 
            to="/dashboard/signup" 
            className={`nav-link ${isActive('signup')}`}
          >
            Course Signup
          </Link>
        </div>

        {/* Search and Add Request Section */}
        <div className="search-add-container">
          {/* Search Bar Component */}
          <SearchBar />

          {/* Add Request Button */}
          <button className="add-request-btn">
            <span>+</span>
            <span>Add Request</span>
          </button>
        </div>

        {/* Routes for content */}
        <Routes>
          <Route path="courseswap" element={<CourseSwap />} />
          <Route path="requests" element={<SwapRequestsList />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<CourseSwap />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;