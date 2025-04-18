import React from 'react';
import logoImage from '../assets/logo.png'; // adjust the path as needed

const Logo = () => {
  return (
    <div className="logo-wrapper">
      <img src={logoImage} alt="Logo" className="sidebar-logo" />
      {/* <div className="logo-title">CourseSwap</div> */}
    </div>
  );
};

export default Logo;
