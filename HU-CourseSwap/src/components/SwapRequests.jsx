import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
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
      const searchQuery = query(
        collection(db, 'swapRequests'),
        where('wantCourse', '==', trimmedTerm)
      );
      const snapshot = await getDocs(searchQuery);
      const filtered = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSwapRequests(filtered);
    } catch (error) {
      console.error("Error filtering swap requests:", error);
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
              <button className="swap-card-btn">Interested</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SwapRequests;
