import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../../../lib/firebaseConfig';
import Fuse from 'fuse.js';

const PAGE_SIZE = 20; // Adjust page size as needed

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const sortOption = searchParams.get('sort') || 'asc';

  try {
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

    // Pagination
    const snapshot = await getDocs(productsQuery);
    const allProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Searching using Fuse.js
    const fuse = new Fuse(allProducts, { keys: ['title'], threshold: 0.3 });
    const filteredProducts = fuse.search(searchQuery).map(result => result.item);

    // Paginate the results
    const paginatedProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return new Response(JSON.stringify({ products: paginatedProducts, total: filteredProducts.length }), { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response('Failed to fetch products.', { status: 500 });
  }
}
