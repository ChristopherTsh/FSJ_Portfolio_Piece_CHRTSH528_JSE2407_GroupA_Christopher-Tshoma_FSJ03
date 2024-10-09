// app/api/reviews/deleteReview.js
import { db } from '../../../lib/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { verifyToken } from '../../middleware/verifyToken';

export default async function handler(req, res) {
  await verifyToken(req, res, async () => {
    if (req.method !== 'DELETE') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { productId, reviewId } = req.body;

    try {
      const reviewDocRef = doc(db, 'products', productId, 'reviews', reviewId);
      await deleteDoc(reviewDocRef);

      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ error: 'Error deleting review' });
    }
  });
}
