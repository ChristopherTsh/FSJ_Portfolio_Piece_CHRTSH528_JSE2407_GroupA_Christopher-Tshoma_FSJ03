import { getFirestore } from "firebase-admin/firestore";
import admin from "../../../firebaseAdmin"; // Adjust the import path as necessary

const db = getFirestore(admin);

/**
 * API route handler for managing product reviews.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
export default async function handler(req, res) {
  const { productId } = req.query;

  if (req.method === "POST") {
    /**
     * Adds a new review to the specified product.
     * 
     * @param {string} reviewerName - The name of the reviewer.
     * @param {string} comment - The review comment.
     * @param {number} rating - The review rating.
     * @returns {Promise<void>} A promise that resolves when the review is added.
     */
    const { reviewerName, comment, rating } = req.body;
    try {
      const newReview = {
        reviewerName,
        comment,
        rating,
        date: new Date().toISOString(), // Store the current date and time
      };
      await db.collection("products").doc(productId).update({
        reviews: admin.firestore.FieldValue.arrayUnion(newReview), // Add the new review to the reviews array
      });
      res.status(200).json({ success: true }); // Send a success response
    } catch (error) {
      console.error("Error adding review:", error); // Log error to console
      res.status(500).json({ success: false }); // Send a failure response
    }
  } else if (req.method === "DELETE") {
    /**
     * Deletes a review from the specified product.
     * 
     * @param {string} reviewId - The ID of the review to delete.
     * @returns {Promise<void>} A promise that resolves when the review is deleted.
     */
    const { reviewId } = req.query;
    try {
      const productRef = db.collection("products").doc(productId);
      const productDoc = await productRef.get(); // Get the product document
      const updatedReviews = productDoc.data().reviews.filter(
        (review) => review.id !== reviewId // Filter out the review with the given ID
      );
      await productRef.update({ reviews: updatedReviews }); // Update the product document with the new reviews array
      res.status(200).json({ success: true }); // Send a success response
    } catch (error) {
      console.error("Error deleting review:", error); // Log error to console
      res.status(500).json({ success: false }); // Send a failure response
    }
  } else {
    res.status(405).json({ message: "Method not allowed" }); // Handle unsupported methods
  }
}
