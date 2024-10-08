'use client';
import { useState, useEffect } from 'react';
import ProductsClient from './components/ProductsClient';
import CategoryFilter from './components/CategoryFilter';
import Searchbar from './components/Searchbar';
import SortOptions from './components/SortOptions';
import Pagination from './components/Pagination';

export default function Page() {
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('asc');
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('Page state updated:', { category, searchQuery, sortOption, page });
  }, [category, searchQuery, sortOption, page]);

  return (
    <div>
      <CategoryFilter selectedCategory={category} setSelectedCategory={setCategory} />
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
      <ProductsClient category={category} searchQuery={searchQuery} sortOption={sortOption} page={page} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
