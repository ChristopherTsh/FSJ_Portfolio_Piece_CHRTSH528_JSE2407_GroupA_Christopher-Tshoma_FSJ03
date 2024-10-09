import { auth } from '../../lib/firebaseConfig';

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
