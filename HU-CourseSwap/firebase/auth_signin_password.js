import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const signInWithEmailAndPasswordHandler = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User signed in:", user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in:", errorCode, errorMessage);
      throw error;
    });
};