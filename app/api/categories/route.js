import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';

export async function GET() {
  try {
    const categoriesRef = collection(db, 'categories');
    const snapshot = await getDocs(categoriesRef);
    const categories = snapshot.docs.map((doc) => doc.data().categories)[0];
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response('Failed to fetch categories.', { status: 500 });
  }
}
