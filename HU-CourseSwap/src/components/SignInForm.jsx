import React, { useState } from "react";
import "../styles/signIn.css";
import { Link, useNavigate } from "react-router-dom";
import { auth} from "../../firebase/firebaseConfig";
import { signInWithEmailAndPasswordHandler } from "../../firebase/auth_signin_password";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = credentials;

    signInWithEmailAndPasswordHandler(email, password)
      .then((user) => {
        console.log("Login successful:", user);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
        alert("Invalid email or password. Please try again.");
      });
  };

  const handleForgotPassword = () => {
    // Add your forgot password logic here
    console.log("Forgot password clicked");
  };

  return (
    <div className="login-container">
      <div className="login-left-panel">
        <h1>Welcome back!</h1>
        <p>Sign in to Habib University Course Swap portal</p>
        <div className="decorative-elements">
          {/* Decorative elements like the wavy lines in the example */}
          <div className="circle-element top-left"></div>
          <div className="circle-element bottom-right"></div>
          <div className="wave-element"></div>
        </div>
      </div>

      <div className="login-form-panel">
        <div className="login-form-container">
          <h2>Sign In</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Username or email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
            </div>

            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </form>

          <div className="create-account">
            <p>
              New here? <Link to="/signup">Create an Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
