import { NextResponse } from 'next/server';
import { db } from '../../../../lib/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase-admin/auth';

export async function POST(request) {
  const auth = getAuth();
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { productId, reviewId, updatedReview } = await request.json();
  const { comment, rating, reviewerName } = updatedReview;

  if (!productId || !comment || !rating || !reviewerName || !reviewId) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const userEmail = decodedToken.email;

    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    if (!productSnap.exists()) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const productData = productSnap.data();
    const updatedReviews = productData.reviews.map((review) =>
      review.id === reviewId && review.email === userEmail
        ? { ...review, comment, rating, date: new Date().toISOString().split('T')[0] }
        : review
    );

    await updateDoc(productRef, { reviews: updatedReviews });

    return NextResponse.json({ success: 'Review updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}
