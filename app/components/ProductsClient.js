'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig'; // Import Firebase Firestore
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
        async function fetchProductsFromFirebase() {
            let productsRef = collection(db, 'products');
            let q = query(productsRef);

            // Apply category filter
            if (selectedCategory) {
                q = query(q, where('category', '==', selectedCategory));
            }

            // Apply sorting by price
            if (sortOption === 'asc') {
                q = query(q, orderBy('price', 'asc'));
            } else if (sortOption === 'desc') {
                q = query(q, orderBy('price', 'desc'));
            }

            try {
                const snapshot = await getDocs(q);
                let productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Search functionality
                if (searchQuery) {
                    productsData = productsData.filter(product =>
                        product.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }

                // Pagination
                const startIdx = (page - 1) * limit;
                const paginatedProducts = productsData.slice(startIdx, startIdx + limit);

                setProducts(paginatedProducts);
                console.log('Fetched products:', paginatedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProductsFromFirebase();
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
