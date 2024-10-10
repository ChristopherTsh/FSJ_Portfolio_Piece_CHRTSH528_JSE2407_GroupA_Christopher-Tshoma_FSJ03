// reviewApi.js
import { getAuth } from 'firebase/auth';

const API_BASE = '/api/reviews';

// Function to handle adding a review
export async function addReview(productId, reviewData) {
    try {
      const response = await fetch(`/api/reviews/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
  
      // Check if the response is OK (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Try parsing the response
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      console.error("Error adding review:", error);
      return { success: false, message: error.message };
    }
  }
  
  // Function to handle deleting a review
  export async function deleteReview(productId, reviewId) {
    try {
      const response = await fetch(`/api/products/${productId}/reviews/${reviewId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error deleting review:', error);
      return { success: false, message: 'Failed to delete review' };
    }
  }
  
  
  // Function to handle editing an existing review
  export async function editReview(productId, reviewId, updatedReviewData) {
    try {
      const response = await fetch(`/api/reviews/${productId}/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReviewData),
      });
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Try parsing the response
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      console.error("Error editing review:", error);
      return { success: false, message: error.message };
    }
  }
  
