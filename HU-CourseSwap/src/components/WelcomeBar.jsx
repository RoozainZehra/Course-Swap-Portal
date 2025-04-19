// import React from 'react';
// // import './WelcomeBar.css'; // External styles
// import characterImg from '../assets/logo.png'; // Replace with your image

// const WelcomeBar = () => {
//   const today = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   return (
//     <div className="welcome-bar">
//       <div className="welcome-text">
//         <p className="date">{today}</p>
//         <h1>Welcome back, John!</h1>
//         <p className="subtitle">Always stay updated in your student portal</p>
//       </div>
//       {/* <img src={characterImg} alt="Student" className="welcome-img" /> */}
//     </div>
//   );
// };

// export default WelcomeBar;
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import './WelcomeBar.css'; // External styles
import characterImg from '../assets/logo.png'; // Replace with your image

const WelcomeBar = () => {
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get the user document from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          
          if (userDoc.exists()) {
            // Get fullName from the user document
            const userData = userDoc.data();
            const fullName = userData.fullName || '';
            
            // Extract first name by splitting at the first space
            const firstNameOnly = fullName.split(' ')[0];
            setFirstName(firstNameOnly);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="welcome-bar">
      <div className="welcome-text">
        <p className="date">{today}</p>
        <h1>Welcome back, {loading ? '...' : firstName || 'Student'}!</h1>
        <p className="subtitle">Always stay updated in your student portal</p>
      </div>
      {/* <img src={characterImg} alt="Student" className="welcome-img" /> */}
    </div>
  );
};

export default WelcomeBar;