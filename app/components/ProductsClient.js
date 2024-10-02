'use client'; // This makes the component a Client Component

import { useSearchParams } from 'next/navigation';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';
import ProductGrid from './ProductGrid';
import SortOptions from './SortOptions'; 
import ResetButton from './ResetButton'; 
import { useEffect, useState } from 'react';

/**
 * ProductsClient component handles product filtering, sorting, and pagination.
 *
 * @param {Object} props - The component props
 * @param {Array} props.products - The list of products to display
 * @returns {JSX.Element} The ProductsClient component
 */
export default function ProductsClient({ products }) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "");
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || "asc");
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = products;

      if (searchQuery) {
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter(product => 
          product.category === selectedCategory
        );
      }

      if (sortOption === "asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === "desc") {
        filtered.sort((a, b) => b.price - a.price);
      }

      const pages = Math.ceil(filtered.length / 20); 
      setTotalPages(pages);
      const startIndex = (currentPage - 1) * 20;
      setFilteredProducts(filtered.slice(startIndex, startIndex + 20));
    };

    applyFilters();
  }, [products, searchQuery, selectedCategory, sortOption, currentPage]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortOption("asc");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', page);
    window.history.pushState({}, '', `${window.location.pathname}?${newParams}`);
    setCurrentPage(page);
  };

  return (
    <>
      {/* Container for filter controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="flex flex-col md:flex-row space-x-2 md:space-x-4">
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
          <ResetButton resetFilters={resetFilters} /> {/* Reset Button */}
        </div>
      </div>
      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />
      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
