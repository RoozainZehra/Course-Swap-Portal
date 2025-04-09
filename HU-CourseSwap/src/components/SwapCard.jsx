import React from 'react';

function SwapCard({ request }) {
  const { haveCourse, wantCourse, haveTime, wantTime, haveDays, wantDays } = request;

  return (
    <div className="swap-card">
      <h3>{haveCourse} → {wantCourse}</h3>
      <p>Current Time: {haveTime}</p>
      <p>Wanted Time: {wantTime}</p>
      <div>Current Days: {haveDays.join(', ')}</div>
      <div>Wanted Days: {wantDays.join(', ')}</div>
    </div>
  );
}

export default SwapCard;

