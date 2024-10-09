// app/api/reviews/updateReview.js
import { db } from '../../../lib/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { verifyToken } from '../../middleware/verifyToken';

export default async function handler(req, res) {
  await verifyToken(req, res, async () => {
    if (req.method !== 'PUT') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { productId, reviewId, rating, comment } = req.body;

    try {
      const reviewDocRef = doc(db, 'products', productId, 'reviews', reviewId);
      await updateDoc(reviewDocRef, {
        rating,
        comment,
        date: new Date(),
      });

      res.status(200).json({ message: 'Review updated successfully' });
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).json({ error: 'Error updating review' });
    }
  });
}
