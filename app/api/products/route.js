import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../../lib/firebaseConfig';
import Fuse from 'fuse.js';

const PAGE_SIZE = 20; // Adjust page size as needed

/**
 * Handles GET requests to fetch products with optional filtering, sorting, 
 * searching, and pagination.
 *
 * This function retrieves products from the 'products' collection in 
 * Firestore, allowing filtering by category, sorting by price, and 
 * searching by title using Fuse.js. The results are paginated based on 
 * the specified page number. It returns the filtered products and 
 * the total count of matched products as a JSON response. In case of 
 * an error, it logs the error and returns a 500 status with a failure message.
 *
 * @async
 * @function GET
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} A Promise that resolves to a Response object
 *          containing the paginated products and total count or an error message.
 * 
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const sortOption = searchParams.get('sort') || 'asc';

  try {
    // Reference to the 'products' collection in Firestore
    const productsRef = collection(db, 'products');
    let productsQuery = productsRef;

    // Filtering by category
    if (category && category !== 'all') {
      productsQuery = query(productsRef, where('category', '==', category));
    }

    // Sorting
    if (sortOption === 'asc') {
      productsQuery = query(productsQuery, orderBy('price', 'asc'));
    } else {
      productsQuery = query(productsQuery, orderBy('price', 'desc'));
    }

    // Fetching all products
    const snapshot = await getDocs(productsQuery);
    const allProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Searching using Fuse.js
    const fuse = new Fuse(allProducts, { keys: ['title'], threshold: 0.3 });
    const filteredProducts = fuse.search(searchQuery).map(result => result.item);

    // Paginate the results
    const paginatedProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // Returning the paginated products and total count as a JSON response
    return new Response(JSON.stringify({ products: paginatedProducts, total: filteredProducts.length }), { status: 200 });
  } catch (error) {
    // Logging the error to the console
    console.error('Error fetching products:', error);
    
    // Returning a 500 status response with an error message
    return new Response('Failed to fetch products.', { status: 500 });
  }
}
