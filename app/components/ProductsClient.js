'use client';

import { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';
import Searchbar from './Searchbar';
import SortOptions from './SortOptions';
import CategoryFilter from './CategoryFilter';

export default function ProductsClient() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [page, setPage] = useState(1);
    const limit = 20;

    useEffect(() => {
        async function fetchProducts() {
            const params = new URLSearchParams({
                search: searchQuery,
                category: selectedCategory,
                sort: sortOption,
                page,
                limit,
            });
            const res = await fetch(`/api/products?${params}`);
            const data = await res.json();
            setProducts(data);
        }
        fetchProducts();
    }, [searchQuery, selectedCategory, sortOption, page]);

    return (
        <div>
            <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
            <ProductGrid products={products} />
            <Pagination page={page} setPage={setPage} />
        </div>
    );
}
