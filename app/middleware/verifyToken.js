import { auth } from '../../lib/firebaseConfig';

/**
 * Retrieves the ID token for the currently authenticated user.
 *
 * @async
 * @function getToken
 * @throws {Error} Throws an error if the user is not authenticated or if fetching the token fails.
 * @returns {Promise<string>} The ID token of the authenticated user.
 */
export const getToken = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      return await user.getIdToken();
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  } else {
    throw new Error('User not authenticated');
  }
};
