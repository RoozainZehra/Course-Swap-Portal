import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/addRequests.css';

const AddRequest = () => {
  const [haveCourse, setHaveCourse] = useState('');
  const [haveSection, setHaveSection] = useState('');
  const [wantCourse, setWantCourse] = useState('');
  const [wantSection, setWantSection] = useState('');

  const handleSubmit = () => {
    console.log('Form Submitted', { haveCourse, haveSection, wantCourse, wantSection });
  };

  return (
    <div className="screen" id="course-schedule-screen">
      <div className="course-form-container">
        {/* Back Button aligned top-right */}
        <div className="back-btn-container">
          <Link to="/dashboard">
            <button className="back-btn">Back</button>
          </Link>
        </div>

        <div className="form-content">
          {/* Have Section */}
          <div className="course-section">
            <div className="form-group">
              <label>Have</label>
              <div className="input-container">
                <select
                  value={haveCourse}
                  onChange={(e) => setHaveCourse(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select a course</option>
                  <option value="cs101">MATH101 - Calculus I</option>
                  <option value="math201">PHIL/CS 223/223 - Ethics of Artificial Intelligence</option>
                  <option value="phy301">EE/CS 371/330 - Computer Architecture</option>
                  <option value="bus102">CS/CE 412/471 - Algorithms: Design and Analysis</option>
                </select>
                <span className="select-arrow">▼</span>
              </div>
            </div>

            <div className="form-group">
              <label>Section</label>
              <div className="input-container">
                <select
                  value={haveSection}
                  onChange={(e) => setHaveSection(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select a section</option>
                  <option value="A">L1</option>
                  <option value="B">L2</option>
                  <option value="C">L3</option>
                  <option value="D">L4</option>
                </select>
                <span className="select-arrow">▼</span>
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
                  className="form-select"
                >
                  <option value="">Select a course</option>
                  <option value="cs101">MATH101 - Calculus I</option>
                  <option value="math201">PHIL/CS 223/223 - Ethics of Artificial Intelligence</option>
                  <option value="phy301">EE/CS 371/330 - Computer Architecture</option>
                  <option value="bus102">CS/CE 412/471 - Algorithms: Design and Analysis</option>
                </select>
                <span className="select-arrow">▼</span>
              </div>
            </div>

            <div className="form-group">
              <label>Section</label>
              <div className="input-container">
                <select
                  value={wantSection}
                  onChange={(e) => setWantSection(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select a section</option>
                  <option value="A">L1</option>
                  <option value="B">L2</option>
                  <option value="C">L3</option>
                  <option value="D">L4</option>
                </select>
                <span className="select-arrow">▼</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit-container">
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRequest;
