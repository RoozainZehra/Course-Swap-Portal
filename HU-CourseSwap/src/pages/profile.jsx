// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ProfileCard from '../components/ProfileCard';
// import Footer from '../components/ProfileFooter';
// import '../styles/profile.css';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';

// function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const auth = getAuth();
//   const db = getFirestore();

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         // User is signed in, fetch their profile data from Firestore
//         try {
//           const userDocRef = doc(db, "users", currentUser.uid);
//           const userDoc = await getDoc(userDocRef);
          
//           if (userDoc.exists()) {
//             // Combine auth user info with additional profile data
//             setUser({
//               uid: currentUser.uid,
//               email: currentUser.email,
//               ...userDoc.data()
//             });
//           } else {
//             // If user document doesn't exist yet, just use auth data
//             setUser({
//               uid: currentUser.uid,
//               email: currentUser.email,
//               name: currentUser.displayName || 'User',
//               phoneNumber: currentUser.phoneNumber || 'Not provided',
//               requests: 0
//             });
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } else {
//         // User is signed out
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, [auth, db]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     // Redirect to login or show a message
//     return <div>Please log in to view your profile</div>;
//   }
// const ProfilePage = () => {
//   const navigate = useNavigate();
  
//   const userData = {
//     name: 'Ali Ahmed',
//     email: 'aaa12345@st.habib.edu.pk',
//     phoneNumber: '0321-2345678',
//     requests: 0,
//   };

//   return (
//     <div className="screen">
//       <div className="profile-page">
//         <div className="navigation-buttons">
//           <button onClick={() => navigate('/dashboard')}>Home</button>
//           <button onClick={() => navigate('/my-requests')}>See Requests</button>
//         </div>
        
//         <main className="profile-content">
//           <ProfileCard userData={userData} />
//         </main>
        
//         <Footer 
//           onEditProfile={() => navigate('/edit-profile')}
//           onLogout={() => navigate('/login')} 
//         />
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import Footer from '../components/ProfileFooter';
import '../styles/profile.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is signed in, fetch their profile data from Firestore
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            // Combine auth user info with additional profile data
            const userData = userDoc.data();
            setUser({
              uid: currentUser.uid,
              Email: userData.Email || currentUser.email,
              Name: userData.Name, 
              "Contact Number": userData["Contact Number"] || 'Not provided',
              studentId: userData.studentId || '',
              requests: 0
            });
          } else {
            // If user document doesn't exist yet, just use auth data
            setUser({
              uid: currentUser.uid,
              Email: currentUser.email,
              Name: currentUser.displayName || 'User',
              "Contact Number": 'Not provided',
              studentId: '',
              requests: 0
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // User is signed out
        setUser(null);
        navigate('/login'); // Redirect to login if not authenticated
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, db, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return <div className="screen">Loading...</div>;
  }

  if (!user) {
    return <div className="screen">Please log in to view your profile</div>;
  }

  // Transform user data to match what ProfileCard expects
  const userData = {
    name: user.Name,
    email: user.Email,
    phoneNumber: user["Contact Number"],
    studentId: user.studentId,
    requests: user.requests || 0
  };

  return (
    <div className="screen">
      <div className="profile-page">
        <div className="navigation-buttons">
          <button onClick={() => navigate('/dashboard')}>Home</button>
          <button onClick={() => navigate('/my-requests')}>See Requests</button>
        </div>
        
        <main className="profile-content">
          <ProfileCard userData={userData} />
        </main>
        
        <Footer 
          onEditProfile={() => navigate('/edit-profile')}
          onLogout={handleLogout} 
        />
      </div>
    </div>
  );
};

export default ProfilePage;