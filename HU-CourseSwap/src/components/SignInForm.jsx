import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();  // useNavigate hook to programmatically navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Logic for form submission
    console.log('Form submitted with:', { email, password, rememberMe });

    // Simulating a login check (you can replace this with an API call or more complex logic)
    if (email === 'rq08445@st.habib.edu.pk' && password === '123456') {
      // After successful login, navigate to the Dashboard
      navigate('/dashboard');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Email Address</label>
      </div>
      <div className="field">
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Password</label>
      </div>
      <div className="content">
        <div className="checkbox">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <div className="pass-link">
          <a href="#">Forgot password?</a>
        </div>
      </div>
      <div className="field">
        <input type="submit" value="Login" />
      </div>
    </form>
  );
};

export default SignInForm;
``
