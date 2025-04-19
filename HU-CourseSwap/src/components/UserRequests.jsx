import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase/firebaseConfig';
import EmptyState from './EmptyState';

const UserRequests = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const clean = (str) => str?.replace(/^['"]+|['"]+$/g, '');

  const fetchUserRequests = async (identifier) => {
    try {
      console.log('Fetching requests for identifier:', identifier);
      const q = query(collection(db, 'swapRequests'), where('userID', '==', identifier));
      const snapshot = await getDocs(q);
      console.log('Snapshot size:', snapshot.size);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUserRequests(data);
    } catch (error) {
      console.error("Error fetching user requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'swapRequests', id));
      setUserRequests(prev => prev.filter(req => req.id !== id));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
        const identifier = user.email.split('@')[0];
        console.log('Current user identifier:', identifier); 
        fetchUserRequests(identifier);
    } else {
        setLoading(false);
    }
    });
    return () => unsubscribe();
  }, []);  

  if (loading) return <p>Loading...</p>;

  return (
    <div className="swap-card-container">
      {userRequests.length === 0 ? (
        <EmptyState />
      ) : (
        userRequests.map((request) => (
          <div key={request.id} className="swap-card">
            <h4>
              {clean(request.haveCourse)} ({clean(request.haveSection)}) → {clean(request.wantCourse)} ({clean(request.wantSection)})
            </h4>
            <p>Status: {request.status}</p>
            <button className="swap-card-btn1" onClick={() => handleDelete(request.id)}>
              Delete Request
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default UserRequests;
