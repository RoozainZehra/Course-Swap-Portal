import { getMessaging, getToken } from "firebase/messaging";
import { getAuth } from "firebase/auth";
import { db } from "./firebaseConfig"; // import firestore db
import { doc, setDoc } from "firebase/firestore";

const VAPID_KEY = "BLK8L-V9K8z-Xs8yeYCPd5SY1Lw12ycV9ksGRbeB_7V-GRD6Sj4y9fcB8M7aG4VIemD9WefcDrXEZ4VE-YiSbb8";

export const saveFcmToken = async (uid) => {
    try {
      const currentUser = await getAuth().currentUser;

      if (!currentUser || currentUser.uid !== uid) {
        throw new Error("User is not authenticated or UID does not match");
      }

      const messaging = getMessaging();
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });

      if (token) {
        console.log("FCM Token retrieved:", token);

        // Save the token to the existing user document in the 'users' collection
        await setDoc(
          doc(db, "users", uid),
          { fcmToken: token }, // Save the FCM token here
          { merge: true } // Merge to avoid overwriting other user data
        );

        console.log("FCM token saved to Firestore.");
      } else {
        console.log("No registration token available.");
      }
    } catch (error) {
      console.error("Error while retrieving FCM token:", error);
    }
};
