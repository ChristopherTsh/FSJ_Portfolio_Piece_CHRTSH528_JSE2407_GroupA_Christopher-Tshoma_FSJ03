// app/products/components/ProductsClient.js

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';

export default function ProductsClient({ category, searchQuery, sortOption, page, setPage }) {
  const [products, setProducts] = useState([]);
  const limit = 20;

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProductsFromFirebase = async () => {
      let productsRef = collection(db, 'products');
      let q = query(productsRef);

      // Apply category filter if not "all"
      if (category && category !== 'all') {
        q = query(productsRef, where('category', '==', category));
      }

      // Apply sorting by price
      if (sortOption === 'asc') {
        q = query(q, orderBy('price', 'asc'));
      } else if (sortOption === 'desc') {
        q = query(q, orderBy('price', 'desc'));
      }

      try {
        const snapshot = await getDocs(q);
        let productsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Search functionality
        if (searchQuery) {
          productsData = productsData.filter((product) =>
            product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Pagination
        const startIdx = (page - 1) * limit;
        const paginatedProducts = productsData.slice(startIdx, startIdx + limit);

        setProducts(paginatedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductsFromFirebase();
  }, [searchQuery, category, sortOption, page]);

  return (
    <div>
      <ProductGrid products={products} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
