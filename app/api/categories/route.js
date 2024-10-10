import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebaseConfig';

/**
 * Handles GET requests to fetch categories from Firestore.
 * 
 * This function retrieves categories from the 'categories' collection in 
 * Firestore, maps the documents to extract the category data, and returns 
 * the categories as a JSON response. In case of an error, it logs the error 
 * and returns a 500 status with a failure message.
 * 
 * @async
 * @function GET
 * @returns {Promise<Response>} A Promise that resolves to a Response object
 *          containing the categories or an error message.
 * 
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export async function GET() {
  try {
    // Reference to the 'categories' collection in Firestore
    const categoriesRef = collection(db, 'categories');

    // Fetching documents from the 'categories' collection
    const snapshot = await getDocs(categoriesRef);

    // Mapping the documents to extract the category data
    const categories = snapshot.docs.map((doc) => doc.data().categories)[0];

    // Returning the categories as a JSON response
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    // Logging the error to the console
    console.error('Error fetching categories:', error);
    
    // Returning a 500 status response with an error message
    return new Response('Failed to fetch categories.', { status: 500 });
  }
}
