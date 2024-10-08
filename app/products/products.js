// app/products/page.js
import ProductsClient from '../components/ProductsClient';
import { collection, query, getDocs, where, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';

/**
 * Fetches products from Firebase based on search, category, and sort options.
 * 
 * @param {string} searchQuery - Search string entered by the user.
 * @param {string} category - Selected category for filtering products.
 * @param {string} sortOption - Sort option for ordering products.
 * @returns {Promise<Array>} The fetched products data.
 */
async function fetchProducts(searchQuery = '', category = '', sortOption = 'asc') {
  let productQuery = query(collection(db, 'products'));

  if (category) {
    productQuery = query(productQuery, where('category', '==', category));
  }

  if (searchQuery) {
    productQuery = query(productQuery, where('title', '>=', searchQuery));
  }

  if (sortOption) {
    productQuery = query(productQuery, orderBy('price', sortOption === 'asc' ? 'asc' : 'desc'));
  }

  const querySnapshot = await getDocs(productQuery);
  const products = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return products;
}

const ProductsPage = async () => {
  const products = await fetchProducts(); // Fetch products here

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ProductsClient products={products} />
    </>
  );
};

export default ProductsPage;
