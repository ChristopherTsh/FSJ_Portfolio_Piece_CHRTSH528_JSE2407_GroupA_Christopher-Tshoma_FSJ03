import { db, auth } from '../../lib/firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { getToken } from '../middleware/verifyToken';

// Function to add a review
// Example of the addReview function
export const addReview = async (productId, review) => {
    // Ensure productId is a valid string
    if (typeof productId !== 'string' || productId.trim() === '') {
        console.error('Received invalid product ID:', productId);
        throw new Error('Invalid product ID');
    }
    
    // Proceed with adding the review...
    const response = await fetch(`/api/reviews/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });

    // Handle response...
};


// Function to edit a review
export const editReview = async (productId, reviewId, updatedData) => {
  try {
    const token = await getToken(); // Get the auth token to verify user
    const user = auth.currentUser;

    if (!user) throw new Error('User not authenticated');

    const reviewDocRef = doc(db, 'products', productId, 'reviews', reviewId);
    const updatedReview = {
      ...updatedData,
      updatedAt: serverTimestamp(), // Firebase timestamp
    };

    await updateDoc(reviewDocRef, updatedReview);

    console.log('Review updated successfully');
    return { message: 'Review updated successfully', updatedReview };
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

// Function to delete a review
export const deleteReview = async (productId, reviewId) => {
  try {
    const token = await getToken(); // Get the auth token to verify user
    const user = auth.currentUser;

    if (!user) throw new Error('User not authenticated');

    const reviewDocRef = doc(db, 'products', productId, 'reviews', reviewId);
    await deleteDoc(reviewDocRef);

    console.log('Review deleted successfully');
    return { message: 'Review deleted successfully' };
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};
