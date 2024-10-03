// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, limit, startAfter } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const db = getFirestore(app);