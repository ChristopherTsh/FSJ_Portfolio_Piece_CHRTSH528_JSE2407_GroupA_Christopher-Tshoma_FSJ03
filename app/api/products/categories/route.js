// app/api/categories/route.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET() {
  const categoriesRef = collection(db, "categories");
  const snapshot = await getDocs(categoriesRef);

  const categories = snapshot.docs.map(doc => doc.data().name);
  
  return new Response(JSON.stringify({ categories }), {
    headers: { "Content-Type": "application/json" },
  });
}
