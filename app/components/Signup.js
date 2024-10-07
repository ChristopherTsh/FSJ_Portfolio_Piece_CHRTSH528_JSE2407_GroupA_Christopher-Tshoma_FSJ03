'use client'; // Enable client-side rendering

import { useState } from 'react';
import { auth } from '../../lib/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/'); // Redirect to home after successful signup
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSignup} className="w-1/3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 mb-4 w-full"
          required
        />
        <button type="submit" className="bg-green-500 px-4 py-2 rounded w-full">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
