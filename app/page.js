// HomePage.js
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductsClient from './components/ProductsClient';
import { fetchProducts } from './utils/api';

export default function HomePage({ searchParams }) {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts(searchParams);
      console.log('Fetched on page load:', products); // Debug log
    };
    fetchData();
  }, [searchParams]);

  return (
    <div>
      <ProductsClient searchParams={searchParams} />
    </div>
  );
}
