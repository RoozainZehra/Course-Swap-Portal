import React from 'react';
// import './WelcomeBar.css'; // External styles
import characterImg from '../assets/logo.png'; // Replace with your image

const WelcomeBar = () => {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="welcome-bar">
      <div className="welcome-text">
        <p className="date">{today}</p>
        <h1>Welcome back, John!</h1>
        <p className="subtitle">Always stay updated in your student portal</p>
      </div>
      {/* <img src={characterImg} alt="Student" className="welcome-img" /> */}
    </div>
  );
};

export default WelcomeBar;
