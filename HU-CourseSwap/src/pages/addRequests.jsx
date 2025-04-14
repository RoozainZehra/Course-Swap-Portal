import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import '../styles/addRequests.css';
import { useEffect} from 'react';
import { db } from '../../firebase/firebaseConfig'; // make sure this path is correct
import { collection, getDocs } from 'firebase/firestore';

const AddRequest = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);

  const [haveCourse, setHaveCourse] = useState('');
  const [haveSection, setHaveSection] = useState('');
  const [wantCourse, setWantCourse] = useState('');
  const [wantSection, setWantSection] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const data = querySnapshot.docs.map(doc => doc.data());

        // Extract course names and sections
        const uniqueCourses = [...new Set(data.map(course => course.name))];
        const uniqueSections = [...new Set(data.map(course => course.Section))];

        setCourseOptions(uniqueCourses);
        setSectionOptions(uniqueSections);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);
  

  const handleSubmit = () => {
    console.log('Form Submitted', { haveCourse, haveSection, wantCourse, wantSection });
  };

  return (
    <div className="screen" id="course-schedule-screen">
      <div className="course-form-container">
        {/* Back Button aligned top-right */}
        <div className="back-btn-container">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>Back</button>
        </div>
        <div className="form-content-horizontal">
          <div className="section-row">
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
                    {courseOptions.map((course, index) => (
                      <option key={index} value={course}>{course}</option>
                    ))}


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
                    {sectionOptions.map((section, index) => (
                      <option key={index} value={section}>{section}</option>
                    ))}

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
                      {courseOptions.map((course, index) => (
                        <option key={index} value={course}>{course}</option>
                      ))}                    
                  
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
                      {sectionOptions.map((section, index) => (
                        <option key={index} value={section}>{section}</option>
                      ))}
                  </select>
                  <span className="select-arrow">▼</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit-container">
            <button className="submit-btn" onClick={() => navigate('/dashboard')}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRequest;
