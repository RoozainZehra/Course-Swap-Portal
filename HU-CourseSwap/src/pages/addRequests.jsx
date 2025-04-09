import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link
import '../styles/addRequests.css'; // Make sure to import your stylesheets

const AddRequest = () => {
  const [haveCourse, setHaveCourse] = useState('');
  const [haveSection, setHaveSection] = useState('');
  const [wantCourse, setWantCourse] = useState('');
  const [wantSection, setWantSection] = useState('');

  const handleSubmit = () => {
    // Logic to handle the form submission
    console.log('Form Submitted', { haveCourse, haveSection, wantCourse, wantSection });
  };

  return (
    <div className="screen" id="course-schedule-screen">
      <div className="course-form-container">
        {/* Home Button (Link to Dashboard or Home Page) */}
        <Link to="/dashboard">
          <button className="home-btn" id="courseHomeBtn">🏠</button>
        </Link>

        <div className="form-content">
          {/* Course Section */}
          <div className="course-section">
            <div className="form-group">
              <label>Have</label>
              <div className="input-container">
                <select
                  value={haveCourse}
                  onChange={(e) => setHaveCourse(e.target.value)}
                  style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                  <option value="">Select a course</option>
                  <option value="cs101">MATH101 - Calculus I</option>
                  <option value="math201">PHIL/CS 223/223 - Ethics of Artificial Intelligence</option>
                  <option value="phy301">EE/CS 371/330 - Computer Architecture</option>
                  <option value="bus102">CS/CE 412/471 - Algorithms: Design and Analysis</option>
                </select>
                <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>▼</span>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '10px' }}>
              <label>Section</label>
              <div className="input-container">
                <select
                  value={haveSection}
                  onChange={(e) => setHaveSection(e.target.value)}
                  style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                  <option value="">Select a section</option>
                  <option value="A">L1</option>
                  <option value="B">L2</option>
                  <option value="C">L3</option>
                  <option value="D">L4</option>
                </select>
                <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>▼</span>
              </div>
            </div>
          </div>

          {/* Want Section */}
          <div className="course-section">
            <div className="form-group">
              <label>Want</label>
              <div className="input-container">
                <select
                  value={wantCourse}
                  onChange={(e) => setWantCourse(e.target.value)}
                  style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                  <option value="">Select a course</option>
                  <option value="cs101">MATH101 - Calculus I</option>
                  <option value="math201">PHIL/CS 223/223 - Ethics of Artificial Intelligence</option>
                  <option value="phy301">EE/CS 371/330 - Computer Architecture</option>
                  <option value="bus102">CS/CE 412/471 - Algorithms: Design and Analysis</option>
                </select>
                <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>▼</span>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '10px' }}>
              <label>Section</label>
              <div className="input-container">
                <select
                  value={wantSection}
                  onChange={(e) => setWantSection(e.target.value)}
                  style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                  <option value="">Select a section</option>
                  <option value="A">L1</option>
                  <option value="B">L2</option>
                  <option value="C">L3</option>
                  <option value="D">L4</option>
                </select>
                <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>▼</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              style={{ padding: '10px 20px', fontSize: '18px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRequest;
