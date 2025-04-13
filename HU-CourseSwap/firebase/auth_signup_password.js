import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const createUserWithEmailAndPasswordHandler = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("User signed up:", user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing up:", errorCode, errorMessage);
      throw error;
    });
};