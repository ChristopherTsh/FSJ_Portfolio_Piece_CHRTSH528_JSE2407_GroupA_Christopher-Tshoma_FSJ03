"use client";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null); // Set user if logged in, otherwise null
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return user;
}
