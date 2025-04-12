import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMbaB7KJhIjoJT5JcVWuW7RbQ7b96Hxn8",
  authDomain: "hucourseswap.firebaseapp.com",
  projectId: "hucourseswap",
  storageBucket: "hucourseswap.firebasestorage.app",
  messagingSenderId: "1066163183237",
  appId: "1:1066163183237:web:d2141f61064ed13ad853ec",
  measurementId: "G-SYNZ3BJBBM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;