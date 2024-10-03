"use client";

import { collection, query, where, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import ProductGrid from './ProductGrid';

export default function ProductsClient({ category, searchQuery, sortOption, page }) {
  const [products, setProducts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchProducts = async () => {
    setLoading(true);
    
    try {
      let productQuery = query(collection(db, 'products'), limit(20));
      
      if (category) {
        productQuery = query(productQuery, where('category', '==', category));
      }

      if (searchQuery) {
        productQuery = query(productQuery, where('title', '>=', searchQuery));
      }

      if (sortOption) {
        productQuery = query(productQuery, orderBy('price', sortOption === 'asc' ? 'asc' : 'desc'));
      }

      const productSnapshot = await getDocs(productQuery);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setLastDoc(productSnapshot.docs[productSnapshot.docs.length - 1]);
      setProducts(productList);
      
    } catch (error) {
      console.error('Error fetching products:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [category, searchQuery, sortOption, page]);

  return <ProductGrid products={products} loading={loading} />;
}
