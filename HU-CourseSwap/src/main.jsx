import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase/firebaseConfig.js";

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Register service worker (but don’t call getToken here!)
navigator.serviceWorker.register("/firebase-messaging-sw.js")
  .then((registration) => {
    console.log("Service Worker registered:", registration);
    // Do NOT call getToken here
  }).catch((err) => {
    console.error("Service Worker registration failed:", err);
  });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />

  </React.StrictMode>
)
