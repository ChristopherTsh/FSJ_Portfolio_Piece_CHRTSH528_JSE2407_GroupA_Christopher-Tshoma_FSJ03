import './globals.css';
import Footer from './components/Footer';
import MetaTags from './components/MetaTags'; // Rendering MetaTags
import ProductsClient from './components/ProductsClient';

/**
 * Fetches all products from the API for initial rendering with caching.
 * 
 * @returns {Promise<Object>} The fetched products data.
 */
async function fetchProducts() {
  const res = await fetch(`https://next-ecommerce-api.vercel.app/products?limit=200`, {
    cache: 'force-cache',
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
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
