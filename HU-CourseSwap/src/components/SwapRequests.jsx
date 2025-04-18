import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import EmptyState from './EmptyState';
// import '../styles/swapRequests.css';

const SwapRequests = () => {
  const [swapRequests, setSwapRequests] = useState([]);

  const clean = (str) => str?.replace(/^['"]+|['"]+$/g, '');
  useEffect(() => {
    const fetchSwapRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'SwapRequests'));
        const request = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSwapRequests(request);
      } catch (error) {
        console.error("Error fetching swap requests:", error);
      }
    };

    fetchSwapRequests();
  }, []);

  return (
    <div className="swap-requests">
      <h2 className="section-title">Available Swap Requests</h2>

      <div className="swap-card-container">
        {swapRequests.length === 0 ? (
          <EmptyState/>
        ) : (
          swapRequests.map((request) => (
            <div key={request.id} className="swap-card">
              <h4>
              {clean(request.have)} ({clean(request.have_section)}) → {clean(request.want)} ({clean(request.want_section)})
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
