// Import Firebase configuration and necessary functions
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

// Define the GET method for fetching categories
export async function GET() {
    try {
        const categoriesRef = collection(db, 'categories');
        const snapshot = await getDocs(categoriesRef);
        const categories = snapshot.docs.map(doc => ({
            id: doc.id,  // Ensure `id` is captured
            ...doc.data()
        }));
        
        return new Response(JSON.stringify(categories), { status: 200 });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return new Response("Failed to fetch categories", { status: 500 });
    }
}
