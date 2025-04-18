// firebase/saveFcmToken.js
import { getMessaging, getToken } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; 

const VAPID_KEY = "BLK8L-V9K8z-Xs8yeYCPd5SY1Lw12ycV9ksGRbeB_7V-GRD6Sj4y9fcB8M7aG4VIemD9WefcDrXEZ4VE-YiSbb8";

export const saveFcmToken = async (user) => {
  try {
    const messaging = getMessaging();
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });

    if (token) {
      // Save the token in the user's Firestore document
      await setDoc(doc(db, "users", user.uid), {
        fcmToken: token
      }, { merge: true });

      console.log("FCM token saved to Firestore");
    }
  } catch (err) {
    console.error("Error getting or saving FCM token:", err);
  }
};
