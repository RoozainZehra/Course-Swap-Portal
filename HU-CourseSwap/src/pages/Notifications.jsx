import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import EmptyState from "../components/EmptyState";
import { db } from "../../firebase/firebaseConfig";
import {
  onSnapshot,
  collection,
  getDoc,
  doc,
  getDocs,
  query, 
  where,
} from "firebase/firestore";
import UserDetailsModal from "../components/UserDetailsModal";
import "../styles/Notifications.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NotificationItem from "../components/NotificationItem";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Set up the authentication listener to track user state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Fetch notifications after user state is updated
  useEffect(() => {
    if (!currentUser) return;
    // console.log("Current user:", currentUser.email);

    const currentUserID = currentUser.email.substring(0, 7);
    // console.log("Current user:", currentUser.email);
    // console.log("Current user ID:", currentUserID);

    const unsubscribe = onSnapshot(
      collection(db, "swapRequests"),
      async (snapshot) => {
        const updatedNotifications = [];

        for (const docSnapshot of snapshot.docs) {
          const data = docSnapshot.data();
          const swapRequestId = docSnapshot.id;
          const isPoster = data.userID === currentUserID;
          console.log("Swap Request ID:", isPoster);
          if (isPoster) {
            console.log("Swap userID:", data.userID, "Current:", currentUserID);
            // Get all docs in the interestedUsers subcollection
            const interestedUsersRef = collection(
              db,
              "swapRequests",
              swapRequestId,
              "interestedUsers"
            );
            const interestedUsersSnapshot = await getDocs(interestedUsersRef);
            console.log("Interested users snapshot:", interestedUsersSnapshot);
            console.log("Interested users size:", interestedUsersSnapshot.size);

            if (!interestedUsersSnapshot.empty) {
              for (const userDoc of interestedUsersSnapshot.docs) {
                const userData = userDoc.data();
                console.log("Interested user doc:", userData);

                const interestedUserID = userDoc.data().identifier;
                console.log("Interested user ID:", interestedUserID);
                const usersQuery = query(
                  collection(db, "users"),
                  where("studentId", "==", interestedUserID)
                );
                const usersSnapshot = await getDocs(usersQuery);
                
                if (usersSnapshot.empty) {
                  console.warn("No user doc found for:", interestedUserID);
                } else {
                  const userDoc = usersSnapshot.docs[0];
                  const userData = userDoc.data();
                
                  updatedNotifications.push({
                    swapRequestId,
                    userID: interestedUserID,
                    userName: userData.fullName,
                    userEmail: userData.email,
                    userPhone: userData.contactNumber,
                    userMessage: userData.message,
                    haveCourse: data.haveCourse,
                    wantCourse: data.wantCourse,
                  });
                }
              }
            }
          }
        }

        setNotifications(updatedNotifications);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleNotificationClick = (notification) => {
    setSelectedUser({
      name: notification.userName,
      email: notification.userEmail,
      phone: notification.userPhone,
      message: notification.userMessage,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (currentUser === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="requests-layout">
      <Sidebar />
      <div className="requests-main">
        <h1 className="section-title">Your Notifications</h1>
        <div className="requests-content">
        {notifications.length === 0 ? (
            <div className="empty-state-wrapper">
              <EmptyState />
            </div>
          ) : (
            notifications.map((notification, index) => (
              <NotificationItem
                key={index}
                notification={notification}
                onClick={handleNotificationClick}
              />
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <UserDetailsModal
          isOpen={isModalOpen}
          user={selectedUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default NotificationsPage;
