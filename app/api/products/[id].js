import { db } from '../../../lib/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

/**
 * API handler for fetching a product by its ID from Firestore.
 *
 * This function handles incoming requests to fetch a specific product 
 * from the 'products' collection in Firestore based on the provided ID.
 * It returns the product data as a JSON response. If the product does 
 * not exist, it returns a 404 status with an error message. In case of 
 * an error during the fetch operation, it logs the error and returns 
 * a 500 status with an error message.
 *
 * @async
 * @function handler
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves when the response is sent.
 * 
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export default async function handler(req, res) {
  // Extracting the product ID from the query parameters
  const { id } = req.query;

  try {
    // Reference to the specific product document in Firestore
    const docRef = doc(db, 'products', id);

    // Fetching the product document from Firestore
    const docSnap = await getDoc(docRef);

    // Checking if the document exists
    if (docSnap.exists()) {
      // Returning the product data as a JSON response
      res.status(200).json({ id: docSnap.id, ...docSnap.data() });
    } else {
      // Returning a 404 status if the product is not found
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    // Logging the error to the console
    console.error('Error fetching product:', error);
    
    // Returning a 500 status response with an error message
    res.status(500).json({ error: 'Error fetching product' });
  }
}
