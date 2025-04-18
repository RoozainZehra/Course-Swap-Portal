import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { register } from '../public/firebase-messaging-sw.js'; // Import register function
import { getMessaging, getToken } from 'firebase/messaging';
import { messaging } from '../firebase/firebaseConfig.js'; // assuming messaging is exported

// register();
const VAPID_KEY = "BLK8L-V9K8z-Xs8yeYCPd5SY1Lw12ycV9ksGRbeB_7V-GRD6Sj4y9fcB8M7aG4VIemD9WefcDrXEZ4VE-YiSbb8";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js') // Must be from public root
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);

      getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log('FCM Token:', currentToken);
            // Save to Firestore
          } else {
            console.log('No FCM token available.');
          }
        })
        .catch((err) => {
          console.error('Error getting FCM token:', err);
        });
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />

  </React.StrictMode>
)
