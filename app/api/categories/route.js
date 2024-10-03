import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
    const categoriesRef = collection(db, 'categories');
    const snapshot = await getDocs(categoriesRef);
    const categories = snapshot.docs.map(doc => doc.data());

    return new Response(JSON.stringify(categories), { status: 200 });
}
