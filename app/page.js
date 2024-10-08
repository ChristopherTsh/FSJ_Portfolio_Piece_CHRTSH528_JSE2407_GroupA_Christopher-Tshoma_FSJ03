'use client';
import { useState, useEffect } from 'react';
import ProductsClient from './components/ProductsClient';
import CategoryFilter from './components/CategoryFilter';
import Searchbar from './components/Searchbar';
import SortOptions from './components/SortOptions';
import ErrorMessage from './components/ErrorMessage';
import Loading from './components/Loading';

export default function Page() {
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('asc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Page state updated:', { category, searchQuery, sortOption, page });
  }, [category, searchQuery, sortOption, page]);

  const resetFilters = () => {
    setCategory('');
    setSearchQuery('');
    setSortOption('asc');
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {error && <ErrorMessage message={error} />}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 p-4">
        <CategoryFilter selectedCategory={category} setSelectedCategory={setCategory} />
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
        <button
          onClick={resetFilters}
          className="border border-gray-300 rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-150 ease-in-out"
        >
          Reset
        </button>
      </div>
      <ProductsClient category={category} searchQuery={searchQuery} sortOption={sortOption} page={page} />
    </div>
  );
}
