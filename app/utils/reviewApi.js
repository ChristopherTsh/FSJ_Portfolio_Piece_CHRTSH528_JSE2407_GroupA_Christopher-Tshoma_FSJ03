// app/utils/reviewApi.js

const TEMP_REVIEW_KEY = 'tempReviews'; // Key for local storage caching

/**
 * Adds a review to local storage and Firebase.
 * @param {string} productId - The ID of the product being reviewed.
 * @param {object} review - The review object.
 * @throws {Error} - If productId is invalid.
 */
export async function addReview(productId, review) {
    if (typeof productId !== 'string' || productId.trim() === '') {
        console.error('Received invalid product ID:', productId);
        throw new Error('Invalid product ID');
    }

    try {
        // Get existing reviews from local storage
        const existingReviews = JSON.parse(localStorage.getItem(TEMP_REVIEW_KEY)) || {};
        
        // Add the new review locally
        const updatedReviews = {
            ...existingReviews,
            [productId]: [...(existingReviews[productId] || []), review]
        };
        
        localStorage.setItem(TEMP_REVIEW_KEY, JSON.stringify(updatedReviews));

        // Here you can add the Firebase update functionality to sync in the background
        // e.g., await firebaseAddReview(productId, review);

        console.log('Review added successfully:', review);
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
}

/**
 * Updates a review in local storage and Firebase.
 * @param {string} productId - The ID of the product being reviewed.
 * @param {string} reviewId - The ID of the review to update.
 * @param {object} updatedData - The updated review data.
 */
export async function editReview(productId, reviewId, updatedData) {
    const existingReviews = JSON.parse(localStorage.getItem(TEMP_REVIEW_KEY)) || {};

    // Find and update the review in the local storage cache
    const productReviews = existingReviews[productId] || [];
    const updatedReviews = productReviews.map((review) =>
        review.id === reviewId ? { ...review, ...updatedData } : review
    );

    existingReviews[productId] = updatedReviews;
    localStorage.setItem(TEMP_REVIEW_KEY, JSON.stringify(existingReviews));

    // Update Firebase in the background
    // await firebaseEditReview(productId, reviewId, updatedData);

    console.log('Review updated successfully:', updatedData);
}

/**
 * Deletes a review from local storage and Firebase.
 * @param {string} productId - The ID of the product.
 * @param {string} reviewId - The ID of the review to delete.
 */
export async function deleteReview(productId, reviewId) {
    const existingReviews = JSON.parse(localStorage.getItem(TEMP_REVIEW_KEY)) || {};
    
    // Filter out the review to delete from local storage
    const productReviews = existingReviews[productId] || [];
    const updatedReviews = productReviews.filter(review => review.id !== reviewId);

    existingReviews[productId] = updatedReviews;
    localStorage.setItem(TEMP_REVIEW_KEY, JSON.stringify(existingReviews));

    // Delete from Firebase in the background
    // await firebaseDeleteReview(productId, reviewId);

    console.log('Review deleted successfully:', reviewId);
}
