import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'; // Update this path if needed
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPasswordHandler } from "../../firebase/auth_signup_password"; // Adjust path as needed
// import validatePassword from '../firebase/auth_validate_password'; // Adjust path as needed
import logo from '../assets/logo.png'; // Adjust path as needed


const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } 

    if (!validateHUEmail(formData.email)) {
      newErrors.email = 'Please enter a valid Habib University student email';
    }

    if (formData.password !== formData.confirmPassword) { // Check if passwords match
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) { //all good, proceed to signup
      console.log('Form submitted:', formData);
      createUserWithEmailAndPasswordHandler(formData.email, formData.password)
        .then((user) => {
          console.log("Signup successful:", user);
          navigate("/");
        })
        .catch((error) => {
          console.error("Signup failed:", error.message);
          alert("Signup failed. Please try again.");
        });
      alert('Account created successfully!');
    }

    else {
      console.log('Form validation failed:', errors);
      // alert('Please fix the errors in the form.');
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