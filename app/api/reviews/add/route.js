import { NextResponse } from 'next/server';
import { db } from '../../../../lib/firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase-admin/auth';  // Assuming you have Firebase Admin SDK configured

// Add review
export async function POST(request) {
  const auth = getAuth();
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { productId, review } = await request.json();
  const { comment, rating, reviewerName } = review;

  if (!productId || !comment || !rating || !reviewerName) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const userEmail = decodedToken.email;

    const reviewData = {
      reviewerName,
      email: userEmail,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
    };

    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      reviews: arrayUnion(reviewData),
    });

    return NextResponse.json({ success: 'Review added successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
  }
}
