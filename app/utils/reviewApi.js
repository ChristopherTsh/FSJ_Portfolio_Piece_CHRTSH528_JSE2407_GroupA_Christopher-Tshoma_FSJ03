// app/utils/reviewApi.js
import axios from 'axios';
import { auth } from '../../lib/firebaseConfig';

const getToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  throw new Error("User not authenticated");
};

export const addReview = async (productId, rating, comment) => {
  const token = await getToken();

  try {
    const response = await axios.post('/api/reviews/addReview', {
      productId,
      rating,
      comment,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};
