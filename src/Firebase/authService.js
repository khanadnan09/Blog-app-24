import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "./Firebase";

export const signInWithEmail = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};
export const firebaseOnAuthStateChanged = (callback) => {
  return onAuthStateChanged(auth, callback);
};
