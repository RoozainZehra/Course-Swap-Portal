import React from 'react';
// import Logo from '../assets/logo.jpeg' // Assuming you have a Logo component
import SignInForm from '../components/SignInForm';  // New Form Component
import '../styles/signIn.css';  // Importing the CSS for sign-in page


const SignInPage = () => {
  return (
    <div className="wrapper">
      {/* Sign In Form Component */}
      <SignInForm />
    </div>
    
  );
};

export default SignInPage;
