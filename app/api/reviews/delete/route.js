import { NextResponse } from 'next/server';
import { db } from '../../../../lib/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase-admin/auth';

export async function DELETE(request) {
  const auth = getAuth();
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { productId, reviewId } = await request.json();

  if (!productId || !reviewId) {
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
    const filteredReviews = productData.reviews.filter(
      (review) => review.id !== reviewId || review.email !== userEmail
    );

    await updateDoc(productRef, { reviews: filteredReviews });

    return NextResponse.json({ success: 'Review deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
