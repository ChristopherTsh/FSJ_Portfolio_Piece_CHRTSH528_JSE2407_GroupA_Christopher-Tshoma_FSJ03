// app/lib/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase configuration object.
 * @type {Object}
 * @property {string} apiKey - Your Firebase API key.
 * @property {string} authDomain - Your Firebase Auth domain.
 * @property {string} projectId - Your Firebase project ID.
 * @property {string} storageBucket - Your Firebase storage bucket.
 * @property {string} messagingSenderId - Your Firebase messaging sender ID.
 * @property {string} appId - Your Firebase app ID.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Initializes the Firebase app.
 * @returns {FirebaseApp} The initialized Firebase app.
 */
const app = initializeApp(firebaseConfig);

/** 
 * Firebase Auth instance.
 * @type {Auth}
 */
export const auth = getAuth(app);

/** 
 * Firestore database instance.
 * @type {Firestore}
 */
export const db = getFirestore(app);

console.log("Firebase App initialized:", app);
console.log("Auth instance:", auth);
console.log("Firestore DB instance:", db);

export default app;
