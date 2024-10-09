// app/lib/auth.js

import { signOut } from 'firebase/auth';
import { auth } from '../app/products/products';

/**
 * Logs out the currently authenticated user.
 * @returns {Promise<void>} A promise that resolves when the user has been logged out.
 * @throws {Error} Throws an error if the logout process fails.
 */
export function logOut() {
  return signOut(auth);
}
