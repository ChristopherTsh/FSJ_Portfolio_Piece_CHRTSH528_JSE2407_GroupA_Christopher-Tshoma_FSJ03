// app/products/page.js

'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import ProductsClient from './components/ProductsClient';
import CategoryFilter from './components/CategoryFilter';
import Searchbar from './components/Searchbar';
import SortOptions from './components/SortOptions';
import ErrorMessage from './components/ErrorMessage';
import Loading from './components/Loading';

/**
 * Page component for displaying products with filtering, searching, and sorting functionalities.
 *
 * @returns {JSX.Element} The rendered Page component.
 */
export default function Page() {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('asc');
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Page state updated:', { category, searchQuery, sortOption, page });
  }, [category, searchQuery, sortOption, page]);

  /**
   * Resets the filter options to their default values.
   * Resets category to 'all', search query to an empty string,
   * sort option to 'asc', and page to 1.
   */
  const resetFilters = () => {
    setCategory('all');
    setSearchQuery('');
    setSortOption('asc');
    setPage(1); // Reset page to 1 when filters are reset
  };

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesRef = collection(db, 'categories');
        const snapshot = await getDocs(categoriesRef);
        // Access the array of categories directly from the document
        const categoryData = snapshot.docs.map((doc) => doc.data().categories)[0];
        setCategories(['all', ...categoryData]);  // Include "all" in the categories list
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {error && <ErrorMessage message={error} />}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 p-4">
        <CategoryFilter selectedCategory={category} setSelectedCategory={setCategory} categories={categories} />
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
        <button
          onClick={resetFilters}
          className="border border-gray-300 rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-150 ease-in-out"
        >
          Reset
        </button>
      </div>
      <ProductsClient 
        category={category} 
        searchQuery={searchQuery} 
        sortOption={sortOption} 
        page={page} 
        setPage={setPage} // Pass setPage here
      />
    </div>
  );
}
