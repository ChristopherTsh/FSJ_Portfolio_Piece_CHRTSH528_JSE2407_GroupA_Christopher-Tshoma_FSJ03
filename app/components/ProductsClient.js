"use client";
import { useState } from 'react';
import ProductGrid from './ProductGrid';
import CategoryFilter from './CategoryFilter';
import Searchbar from './Searchbar';
import SortOptions from './SortOptions';
import Pagination from './Pagination';

/**
 * ProductsClient component that handles the product grid display, filtering, searching, and sorting.
 * 
 * @param {Array} products - The list of products passed from Firebase.
 * @returns {JSX.Element} The rendered ProductsClient component.
 */
export default function ProductsClient({ products }) {
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('asc');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Apply filters when category, search, or sort option changes
  const applyFilters = () => {
    let updatedProducts = [...products];

    if (category) {
      updatedProducts = updatedProducts.filter((product) => product.category === category);
    }

    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === 'asc') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'desc') {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  };

  return (
    <div>
      <CategoryFilter selectedCategory={category} setSelectedCategory={setCategory} />
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
      <ProductGrid products={filteredProducts} />
      <Pagination />
    </div>
  );
}
