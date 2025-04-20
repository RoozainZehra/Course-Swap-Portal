import React, { useState, useEffect } from "react";
import "../styles/signIn.css";
import { Link, useNavigate } from "react-router-dom";
import { auth} from "../../firebase/firebaseConfig";
import { signInWithEmailAndPasswordHandler } from "../../firebase/auth_signin_password";
import { saveFcmToken } from "../../firebase/saveFcmToken";
import { db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { getMessaging, getToken } from "firebase/messaging";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Pushwoosh script and subscription logic will be handled after login
  //   const loadPushwooshScript = () => {
  //     const script = document.createElement('script');
  //     script.src = 'https://cdn.pushwoosh.com/webpush/v3/pushwoosh-web-notifications.js';
  //     script.async = true;
  //     script.onload = () => {
  //       console.log('Pushwoosh SDK script loaded');
  //     };
  //     document.body.appendChild(script);
  //   };

  //   loadPushwooshScript();
  // }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    
    try {
      const user = await signInWithEmailAndPasswordHandler(email, password);
      const uid = user.uid;
  
      // Fetch the ID token for the signed-in user
      // const idToken = await user.getIdToken();
      // console.log("ID Token:", idToken);  // This is required for FCM
    
      // // Initialize FCM after the user is authenticated
      // const messaging = getMessaging();
      // let fcmToken = null;  // Declare it outside the block
      
      // if ('serviceWorker' in navigator) {
      //   navigator.serviceWorker.register('/firebase-messaging-sw.js')
      //     .then((registration) => {
      //       // Proceed with FCM token request after registration
      //       getToken(messaging, {
      //         vapidKey: "YOUR_VAPID_KEY",
      //         serviceWorkerRegistration: registration,  // Make sure this is valid
      //       }).then((fcmToken) => {
      //         console.log("FCM Token:", fcmToken);
      //         if (fcmToken) {
      //           saveFcmToken(uid, fcmToken);  // Save token to Firestore
      //         }
      //       }).catch((error) => {
      //         console.error("Error retrieving FCM token:", error);
      //       });
      //     })
      //     .catch((error) => {
      //       console.error("Service Worker registration failed:", error);
      //     });
      // }      
      
      // // If FCM token is successfully retrieved, save it to Firestore
      // if (fcmToken) {
      //   await saveFcmToken(uid, fcmToken);  // Assuming this function saves the token
      // }
    
      // Save user data to Firestore
      const userData = { email: user.email, lastLogin: Date.now() };
      await setDoc(doc(db, "users", uid), userData, { merge: true });
    
      console.log("Login successful:", user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Invalid email or password. Please try again.");
    }
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
