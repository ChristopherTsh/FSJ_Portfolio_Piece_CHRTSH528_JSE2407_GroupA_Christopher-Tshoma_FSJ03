// app/products/components/ProductsClient.js

'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';
import ProductGrid from './ProductGrid';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import Pagination from './Pagination';

/**
 * ProductsClient component fetches and displays products from Firebase Firestore.
 *
 * @param {Object} props - The component props.
 * @param {string} props.category - The selected product category for filtering.
 * @param {string} props.searchQuery - The search query for filtering products.
 * @param {string} props.sortOption - The selected sorting option ('asc' or 'desc').
 * @param {number} props.page - The current page number for pagination.
 * @param {function} props.setPage - The function to set the current page number.
 * @returns {JSX.Element} The ProductsClient component.
 */
export default function ProductsClient({ category, searchQuery, sortOption, page, setPage }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const PAGE_SIZE = 20;

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
            return sortOption === 'asc' ? a.price - b.price : b.price - a.price;
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

  // Pagination logic
  const paginatedProducts = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <ProductGrid products={paginatedProducts} />
      <Pagination
        currentPage={page}
        totalProducts={products.length}
        onPageChange={setPage}
      />
    </div>
  );
}
