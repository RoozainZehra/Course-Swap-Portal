import React, { useState } from 'react';
import SwapCard from './SwapCard';

function CourseSwap({ showScreen }) {
  const [haveCourse, setHaveCourse] = useState('');
  const [wantCourse, setWantCourse] = useState('');
  const [haveDays, setHaveDays] = useState([]);
  const [wantDays, setWantDays] = useState([]);
  const [haveTime, setHaveTime] = useState('');
  const [wantTime, setWantTime] = useState('');
  const [userRequests, setUserRequests] = useState([]);

  const handleRequestSubmit = () => {
    const newRequest = {
      haveCourse,
      wantCourse,
      haveDays,
      wantDays,
      haveTime,
      wantTime,
    };

    setUserRequests([...userRequests, newRequest]);
  };

  return (
    <div>
      <button onClick={() => showScreen('profile')}>Go to Profile</button>
      <button onClick={() => showScreen('my-requests')}>My Requests</button>

      <div>
        <input
          type="text"
          value={haveCourse}
          onChange={(e) => setHaveCourse(e.target.value)}
          placeholder="Course You Have"
        />
        <input
          type="text"
          value={wantCourse}
          onChange={(e) => setWantCourse(e.target.value)}
          placeholder="Course You Want"
        />
        <input
          type="text"
          value={haveTime}
          onChange={(e) => setHaveTime(e.target.value)}
          placeholder="Current Time"
        />
        <input
          type="text"
          value={wantTime}
          onChange={(e) => setWantTime(e.target.value)}
          placeholder="Desired Time"
        />
        {/* Here you can add logic for selecting days */}
        <button onClick={handleRequestSubmit}>Submit Swap Request</button>
      </div>

      <div>
        {userRequests.map((req, index) => (
          <SwapCard key={index} request={req} />
        ))}
      </div>
    </div>
  );
}

export default CourseSwap;
