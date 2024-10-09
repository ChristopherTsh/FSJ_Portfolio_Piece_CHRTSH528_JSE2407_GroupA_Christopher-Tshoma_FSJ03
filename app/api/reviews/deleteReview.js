import { verifyToken } from '../../../lib/verifyToken';

/**
 * API handler for deleting a review.
 *
 * This function handles DELETE requests to remove a specific review. 
 * It verifies the user's token and checks that the review ID is provided. 
 * The review deletion is mocked for demonstration purposes.
 *
 * @async
 * @function handler
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves when the response is sent.
 * 
 * @throws {Error} Throws an error if the request method is not DELETE or if 
 *                 the token verification fails.
 */
export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await verifyToken(req, res);

    const { reviewId } = req.body;

    if (!reviewId) {
      return res.status(400).json({ message: 'Review ID is required' });
    }

    // Mock: Remove the review from local storage (replace this with actual logic)
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
