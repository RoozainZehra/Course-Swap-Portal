import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'; // Update this path if needed
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPasswordHandler } from "../../firebase/auth_signup_password"; // Adjust path as needed
import { validatePasswordHandler } from "../../firebase/auth_validate_password";
import logo from '../assets/logo.png'; // Adjust path as needed
import { validatePassword } from 'firebase/auth';
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '', 
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateHUEmail = (email) => {
    const huEmailPattern = /^[a-z]{2}\d{5}@st\.habib\.edu\.pk$/;
    return huEmailPattern.test(email);
  };

  const validateForm = async () => {
    const newErrors = {};
  
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
  
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateHUEmail(formData.email)) {
      newErrors.email = "Please enter a valid Habib University student email";
    }
  
    // Await the result of validatePasswordHandler
    const validPassword = await validatePasswordHandler(formData.password);
  
    if (!validPassword.isValid) {
      if (validPassword.needsLowerCase) {
        newErrors.password = "Password must contain at least one lowercase letter.";
      }
      if (validPassword.needsUpperCase) {
        newErrors.password = "Password must contain at least one uppercase letter.";
      }
      if (validPassword.needsNumber) {
        newErrors.password = "Password must contain at least one number.";
      }
      if (validPassword.needsMinLength) {
        newErrors.password = "Password must be at least 6 characters long.";
      }
    }
  
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const isValid = await validateForm();
    
      if (isValid) {
        console.log("Form submitted:", formData);
        createUserWithEmailAndPasswordHandler(formData.email, formData.password)
        .then((user) => {
          console.log("Signup successful:", user);
          setSuccessMessage("Account created successfully!");
          setTimeout(() => {
            navigate("/");
          }, 2000); // Give user 2 seconds to see the message
        })        
          .catch((error) => {
            console.error("Signup failed:", error.message);
            alert("Signup failed. Please try again.");
          });
      } else {
        console.log("Form validation failed:", errors);
      }
    };

  return (
    <div className="signup-container">
      <div className="signup-left-panel">
        <h1>Join Us!</h1>
        <p>Sign up to Habib University Course Swap portal</p>
        <div className="decorative-elements">
          {/* Decorative elements like the wavy lines in the example */}
          <div className="circle-element top-left"></div>
          <div className="circle-element bottom-right"></div>
          <div className="wave-element"></div>
        </div>
      </div>
        <div className="auth-form">
          <h2>Create Account</h2>
          {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          ...
        </form>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <div className="error-message">{errors.fullName}</div>}
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>
            
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>
            
            <button type="submit" className="auth-button">
              Create Account
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </div>
      </div>
  );
};

export default SignUp;
