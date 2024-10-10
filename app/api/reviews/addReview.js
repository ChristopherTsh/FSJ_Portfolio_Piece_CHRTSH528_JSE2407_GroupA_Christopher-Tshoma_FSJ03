// app/utils/reviewApi.js
/**
 * Adds a review to the specified product.
 *
 * @param {string} productId - The ID of the product to add the review to.
 * @param {Object} reviewData - The review data object to be added.
 * @throws Will throw an error if the productId is invalid.
 * @returns {Promise<void>} A promise that resolves if the review is added successfully.
 */
export async function addReview(productId, reviewData) {
  // Check if productId is valid
  if (typeof productId !== 'string' || productId.trim() === '') {
      console.error('Received invalid product ID:', productId);
      throw new Error('Invalid product ID');
  }

  try {
      // Proceed with adding the review
      const docRef = doc(db, 'products', productId, 'reviews');
      await setDoc(docRef, reviewData);
      console.log('Review added successfully');
  } catch (error) {
      console.error('Error adding review:', error);
      throw new Error('Failed to add review');
  }
}
