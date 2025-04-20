import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, addDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import EmptyState from './EmptyState';
import SearchBar from './SearchBar';

const SwapRequests = () => {
  const [swapRequests, setSwapRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const clean = (str) => str?.replace(/^['"]+|['"]+$/g, '');

  const fetchAllRequests = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'swapRequests'));
      const requests = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSwapRequests(requests);
    } catch (error) {
      console.error("Error fetching swap requests:", error);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const handleSearch = async () => {
    const trimmedTerm = searchTerm.trim().toUpperCase();
  
    if (!trimmedTerm) {
      fetchAllRequests();
      return;
    }
  
    try {
      const wantQuery = query(
        collection(db, 'swapRequests'),
        where('wantCourse', '==', trimmedTerm)
      );
      const haveQuery = query(
        collection(db, 'swapRequests'),
        where('haveCourse', '==', trimmedTerm)
      );
  
      const [wantSnap, haveSnap] = await Promise.all([
        getDocs(wantQuery),
        getDocs(haveQuery)
      ]);
  
      // Merge both results and remove duplicates if any
      const docsMap = new Map();
  
      wantSnap.docs.forEach(doc => {
        docsMap.set(doc.id, { id: doc.id, ...doc.data() });
      });
  
      haveSnap.docs.forEach(doc => {
        docsMap.set(doc.id, { id: doc.id, ...doc.data() });
      });
  
      setSwapRequests(Array.from(docsMap.values()));
    } catch (error) {
      console.error("Error filtering swap requests:", error);
    }
  };

  const handleInterested = async (requestId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user || !user.email) {
        alert("Please log in to express interest.");
        return;
      }
  
      const identifier = user.email.split('@')[0]; // Extracts "aa01010" from email
  
      const interestedUserRef = collection(db, 'swapRequests', requestId, 'interestedUsers');
  
      await addDoc(interestedUserRef, {
        identifier: identifier,
        timestamp: new Date()
      });
  
      alert("You've been marked as interested!");
    } catch (error) {
      console.error("Error saving interest:", error);
      alert("Failed to mark interest. Try again.");
    }
  };
  
  
  
  return (
    <div className="swap-requests">
      <div className="searchbar-wrapper">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          placeholder="Search want courses..."
        />
      </div>
      <h2 className="section-title">Available Swap Requests</h2>

      <div className="swap-card-container">
        {swapRequests.length === 0 ? (
          <EmptyState />
        ) : (
          swapRequests.map((request) => (
            <div key={request.id} className="swap-card">
              <h4>
                {clean(request.haveCourse)} ({clean(request.haveSection)}) → {clean(request.wantCourse)} ({clean(request.wantSection)})
              </h4>
              <p>Status: {request.status}</p>
              <button className="swap-card-btn" onClick={() => handleInterested(request.id)}>
                Interested
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SwapRequests;
