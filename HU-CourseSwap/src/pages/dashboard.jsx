import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import WelcomeBar from "../components/WelcomeBar";
import SwapRequests from "../components/SwapRequests";
import "../styles/dashboard.css";
import { getMessaging } from "firebase/messaging";
import { getToken } from "firebase/messaging";
// import OneSignal from 'react-onesignal';

// const messaging = getMessaging();
// const VAPID_KEY =
//   "BLK8L-V9K8z-Xs8yeYCPd5SY1Lw12ycV9ksGRbeB_7V-GRD6Sj4y9fcB8M7aG4VIemD9WefcDrXEZ4VE-YiSbb8";

const DashboardPage = () => {
  const navigate = useNavigate();

  // getToken(messaging, {
  //   vapidKey: "VAPID_KEY",
  //   serviceWorkerRegistration: registration,
  // })
  //   .then((token) => {
  //     if (token) {
  //       console.log("FCM Token:", token);
  //       // Save token to Firestore or backend
  //     } else {
  //       console.warn("No FCM token available.");
  //     }
  //   })
  //   .catch((err) => {
  //     console.error("Error getting FCM token:", err);
  //   });

  return (
    <div className="dashboard-page">
      <Sidebar />

      <div className="dashboard-content max-w-4xl mx-auto px-4 pt-6 md:pl-[270px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <WelcomeBar />
        </div>

        <SwapRequests />
      </div>

      <button
        className="fab-add-request"
        onClick={() => navigate("/add-request")}
      >
        +
      </button>
    </div>
  );
};

export default DashboardPage;
