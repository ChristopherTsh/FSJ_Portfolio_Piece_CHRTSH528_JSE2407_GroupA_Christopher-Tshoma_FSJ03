import { verifyToken } from '../../../lib/verifyToken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await verifyToken(req, res);

    const { productId, rating, comment, email, name } = req.body;

    if (!productId || !rating || !comment || !email || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Mock saving the review locally (in-memory storage)
    const review = {
      id: Date.now().toString(),
      productId,
      rating,
      comment,
      email,
      name,
      date: new Date().toISOString(),
    };

    // Respond with success
    res.status(200).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
