import { verifyToken } from '../../../lib/verifyToken';

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
