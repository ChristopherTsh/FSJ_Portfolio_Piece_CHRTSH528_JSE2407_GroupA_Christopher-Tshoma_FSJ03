// app/products/components/ProductsClient.js
'use client';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';
import ProductGrid from './ProductGrid';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

export default function ProductsClient({ category, searchQuery, sortOption, page, setPage }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch products from Firebase Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const productsRef = collection(db, 'products');
        let productsQuery = productsRef;

        // Apply category filter if not 'all'
        if (category !== 'all') {
          productsQuery = query(productsRef, where('category', '==', category));
        }

        const snapshot = await getDocs(productsQuery);

        if (snapshot.empty) {
          setError('No products found.');
          setProducts([]);
        } else {
          const productList = snapshot.docs.map((doc) => doc.data());

          // Apply search filter
          const filteredProducts = productList.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );

          // Sort products
          const sortedProducts = filteredProducts.sort((a, b) => {
            if (sortOption === 'asc') {
              return a.price - b.price;
            } else {
              return b.price - a.price;
            }
          });

          setProducts(sortedProducts);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery, sortOption]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <ProductGrid products={products} />
      {/* Pagination logic could be added here if needed */}
    </div>
  );
}
