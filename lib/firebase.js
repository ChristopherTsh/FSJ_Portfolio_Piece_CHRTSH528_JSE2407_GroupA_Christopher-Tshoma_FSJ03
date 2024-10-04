// app/lib/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config
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

// Initialize Firestore
const db = getFirestore(app);

// Export the initialized Firestore instance
export default { db };
