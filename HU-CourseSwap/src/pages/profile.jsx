import React from 'react';
import Header from '../components/Header';  // Assuming you have a Header component
import ProfileCard from '../components/profilecard';  // Assuming you have a ProfileCard component
import Footer from '../components/Footer';  // Assuming you have a Footer component
import '../styles/profile.css';  // Importing the profile-specific CSS file

const ProfilePage = () => {
  return (
    <div className="screen" id="profile-screen">
      {/* Header Component */}
      <Header />

      {/* Profile Content */}
      <main className="profile-content">
        {/* Profile Card Component */}
        <ProfileCard />
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default ProfilePage;

