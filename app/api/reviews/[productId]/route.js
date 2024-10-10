import { db } from '../../../../lib/firebaseConfig';
import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

// Function to handle POST request (Adding a review)
export async function POST(request, { params }) {
  const { productId } = params;

  try {
    const reviewData = await request.json();
    const productRef = doc(db, 'products', productId);
    const reviewsCollectionRef = collection(productRef, 'reviews');

    const newReviewRef = await addDoc(reviewsCollectionRef, reviewData);

    return NextResponse.json({ success: true, reviewId: newReviewRef.id }, { status: 200 });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ success: false, message: 'Failed to add review' }, { status: 500 });
  }
}

// Function to handle DELETE request (Deleting a review)
export async function DELETE(request, { params }) {
  const { productId, reviewId } = params;

  try {
    // Reference to the specific review document inside the reviews subcollection of the product
    const reviewDocRef = doc(db, 'products', productId, 'reviews', reviewId);

    // Delete the document from Firestore
    await deleteDoc(reviewDocRef);

    return NextResponse.json({ success: true, message: 'Review deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete review' }, { status: 500 });
  }
}
