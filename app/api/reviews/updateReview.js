import { verifyToken } from '../../../lib/verifyToken';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await verifyToken(req, res);

    const { reviewId, rating, comment } = req.body;

    if (!reviewId || !rating || !comment) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Mock: Find and update review from local storage (replace this with actual logic)
    res.status(200).json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
