// app/components/Navbar.js

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../../lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/");  // Redirect to home or login page after sign-out
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Site Logo */}
        <Link href="/" legacyBehavior>
          <a className="text-white font-semibold text-lg">E-Commerce Site</a>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link href="/products" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-200">Products</a>
          </Link>
          {user && (
            <Link href="/my-account" legacyBehavior>
              <a className="text-gray-300 hover:text-white transition duration-200">
                My Account
              </a>
            </Link>
          )}
        </div>

        {/* Authentication UI */}
        <div className="flex space-x-4">
          {!user ? (
            <>
              <Link href="/sign-in" legacyBehavior>
                <a className="text-gray-300 hover:text-white transition duration-200">
                  Log In
                </a>
              </Link>
              <Link href="/sign-up" legacyBehavior>
                <a className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200">
                  Sign Up
                </a>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <span className="text-white">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
