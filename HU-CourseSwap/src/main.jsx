import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase/firebaseConfig.js";
import SnackbarWrapper from './components/SnackbarProvider'; // Ensure this is the correct path

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <SnackbarWrapper />
  </React.StrictMode>
)
