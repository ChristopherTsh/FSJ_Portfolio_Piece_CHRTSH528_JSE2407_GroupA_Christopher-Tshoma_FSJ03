'use client'; // Enable client-side rendering

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth } from '../../lib/firebaseConfig'; // Adjust the path if necessary
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('User not logged in, checking routes...');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null); // Clear user state after logout
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <h1 className="text-lg font-bold">E-Commerce</h1>
        </Link>
        <Link href="/products">Products</Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span>Welcome, {user.displayName || user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="bg-blue-500 px-4 py-2 rounded">
              Login
            </Link>
            <Link href="/signup" className="bg-green-500 px-4 py-2 rounded">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
