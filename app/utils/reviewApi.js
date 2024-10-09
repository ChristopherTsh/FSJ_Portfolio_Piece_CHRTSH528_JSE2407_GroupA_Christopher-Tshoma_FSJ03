import { db, auth } from '../../lib/firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { getToken } from '../middleware/verifyToken';

/**
 * Adds a review to a product.
 *
 * @param {string} productId - The ID of the product to which the review is being added.
 * @param {Object} review - The review data.
 * @param {string} review.reviewerName - The name of the reviewer.
 * @param {string} review.comment - The review comment.
 * @param {number} review.rating - The review rating.
 * @throws {Error} Throws an error if the product ID is invalid.
 * @returns {Promise<void>} A promise that resolves when the review is added.
 */
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

/**
 * Edits an existing review for a product.
 *
 * @param {string} productId - The ID of the product containing the review.
 * @param {string} reviewId - The ID of the review to be edited.
 * @param {Object} updatedData - The updated review data.
 * @param {string} [updatedData.comment] - The updated review comment.
 * @param {number} [updatedData.rating] - The updated review rating.
 * @throws {Error} Throws an error if the user is not authenticated.
 * @returns {Promise<Object>} A promise that resolves with a success message and updated review data.
 */
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

/**
 * Deletes a review from a product.
 *
 * @param {string} productId - The ID of the product containing the review.
 * @param {string} reviewId - The ID of the review to be deleted.
 * @throws {Error} Throws an error if the user is not authenticated.
 * @returns {Promise<Object>} A promise that resolves with a success message upon successful deletion.
 */
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
