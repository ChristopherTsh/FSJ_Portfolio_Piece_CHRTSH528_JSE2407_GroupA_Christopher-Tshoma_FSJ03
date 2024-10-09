// app/lib/auth.js
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/**
 * Signs up a new user with email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password for the user.
 * @returns {Promise<User>} A promise that resolves with the created user.
 * @throws {Error} Throws an error if the sign-up process fails.
 */
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User created:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error; // Re-throw the error for higher-level handling
  }
};

/**
 * Signs in an existing user with email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password for the user.
 * @returns {Promise<User>} A promise that resolves with the signed-in user.
 * @throws {Error} Throws an error if the sign-in process fails.
 */
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};

/**
 * Signs out the currently authenticated user.
 *
 * @returns {Promise<void>} A promise that resolves when the user is signed out.
 * @throws {Error} Throws an error if the sign-out process fails.
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

/**
 * Listens for authentication state changes.
 *
 * @param {function} callback - The callback to be called on auth state change.
 */
export const onAuthStateChange = (callback) =>
  onAuthStateChanged(auth, callback);
