// app/lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY9HapebuAaMYSndYtYs_m55qlhq-DTp8",
  authDomain: "next-ecommerce-ddbcc.firebaseapp.com",
  projectId: "next-ecommerce-ddbcc",
  storageBucket: "next-ecommerce-ddbcc.appspot.com",
  messagingSenderId: "785743885572",
  appId: "1:785743885572:web:bee1c772c87d3fb2c28c51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app); // Export Firestore

// Debugging console logs
console.log("Firebase App initialized:", app);
console.log("Auth instance:", auth);
console.log("Firestore DB instance:", db);

export default app;
