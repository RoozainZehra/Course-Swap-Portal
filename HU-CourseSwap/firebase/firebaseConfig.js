import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDMbaB7KJhIjoJT5JcVWuW7RbQ7b96Hxn8",
  authDomain: "hucourseswap.firebaseapp.com",
  projectId: "hucourseswap",
  storageBucket: "hucourseswap.firebasestorage.app",
  messagingSenderId: "1066163183237",
  appId: "1:1066163183237:web:d2141f61064ed13ad853ec",
  measurementId: "G-SYNZ3BJBBM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

export default firebaseConfig;
export { app, auth, db, messaging };
