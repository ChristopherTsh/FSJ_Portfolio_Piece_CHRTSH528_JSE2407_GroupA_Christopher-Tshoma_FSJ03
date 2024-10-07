// app/lib/auth.js
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Sign up function
export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

// Sign in function
export const signIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

// Sign out function
export const signOutUser = async () => {
  await signOut(auth);
};

// Manage Auth state
export const onAuthStateChange = (callback) =>
  onAuthStateChanged(auth, callback);
