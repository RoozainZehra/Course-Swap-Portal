import { getMessaging, getToken } from "firebase/messaging";
import { getAuth } from "firebase/auth";
import { db } from "./firebaseConfig"; // import firestore db
import { doc, setDoc } from "firebase/firestore";

const VAPID_KEY = "BD0ZaBCBIolV7Z3FIiGOFOe7wDkVOIjsMCdQlIlAGjYVcDHqRjE7XS1MG1oST-gQuD4fB2RUbAC0ZvdpJuWY0F8";

export const saveFcmToken = async (uid, registration) => {
  try {
    const currentUser = getAuth().currentUser;

    if (!currentUser || currentUser.uid !== uid) {
      throw new Error("User is not authenticated or UID does not match");
    }

    const messaging = getMessaging();
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });

    if (token) {
      console.log("FCM Token retrieved:", token);
      await setDoc(doc(db, "users", uid), { fcmToken: token }, { merge: true });
      console.log("FCM token saved to Firestore.");
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("Error while retrieving FCM token:", error);
  }
};
