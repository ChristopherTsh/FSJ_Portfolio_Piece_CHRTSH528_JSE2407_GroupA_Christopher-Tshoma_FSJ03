import './globals.css';
import Footer from './components/Footer';
import MetaTags from './components/MetaTags';
import ProductsClient from './components/ProductsClient';
import { collection, query, getDocs, where, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';

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

/**
 * Root layout component that renders the main application structure.
 * 
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Child components to be rendered inside the layout.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
export default async function RootLayout({ children }) {
  const products = await fetchProducts();

  return (
    <html lang="en">
      <head>
        <MetaTags title="E-Commerce Site" description="Shop for the best products" />
      </head>
      <body>
        <div className="max-w-7xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Product List</h1>
          <ProductsClient products={products} />
        </div>
        <Footer />
      </body>
    </html>
  );
}
