// app/api/products.js

import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';

/**
 * API handler for fetching products from Firestore.
 *
 * This function handles GET requests to retrieve a list of products based 
 * on the specified filters: category, search query, sorting option, and 
 * pagination. The function constructs a Firestore query and returns the 
 * filtered product data as a JSON response.
 *
 * @async
 * @function handler
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves when the response is sent.
 * 
 * @throws {Error} Throws an error if the request fails to fetch products.
 */
export default async function handler(req, res) {
  const { category = 'all', searchQuery = '', sortOption = 'asc', page = 1 } = req.query;
  const itemsPerPage = 20;

  try {
    let productsRef = collection(db, 'products');
    let q = query(productsRef);

    // Apply category filter
    if (category && category !== 'all') {
      q = query(q, where('category', '==', category));
    }

    // Apply search filter
    if (searchQuery) {
      q = query(q, where('name', '>=', searchQuery), where('name', '<=', searchQuery + '\uf8ff'));
    }

    // Apply sorting
    if (sortOption === 'asc') {
      q = query(q, orderBy('price', 'asc'));
    } else if (sortOption === 'desc') {
      q = query(q, orderBy('price', 'desc'));
    }

    // Pagination logic
    q = query(q, limit(itemsPerPage * page));

    const snapshot = await getDocs(q);
    const productsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(productsData);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to load products.' });
  }
}
