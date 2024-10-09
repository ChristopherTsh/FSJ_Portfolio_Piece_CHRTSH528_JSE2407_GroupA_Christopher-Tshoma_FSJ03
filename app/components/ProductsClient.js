'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig'; // Import Firebase Firestore
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';

export default function ProductsClient({ category, searchQuery, sortOption, page, setPage }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['all']);
    const limit = 20;

    // Fetch categories from Firebase
    useEffect(() => {
        async function fetchCategories() {
            try {
                const categoriesRef = collection(db, 'categories');
                const categorySnapshot = await getDocs(categoriesRef);
                const categoryList = categorySnapshot.docs.map(doc => doc.id);
                setCategories(['all', ...categoryList]);
                console.log('Fetched categories:', ['all', ...categoryList]);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategories();
    }, []);

    // Fetch products from Firebase
    useEffect(() => {
        async function fetchProductsFromFirebase() {
            let productsRef = collection(db, 'products');
            let q = query(productsRef);

            // Apply category filter if not "all"
            if (category && category !== 'all') {
                console.log('Applying category filter:', category);
                q = query(q, where('category', '==', category));
            }

            // Apply sorting by price
            if (sortOption === 'asc') {
                console.log('Sorting by price ascending');
                q = query(q, orderBy('price', 'asc'));
            } else if (sortOption === 'desc') {
                console.log('Sorting by price descending');
                q = query(q, orderBy('price', 'desc'));
            }

            try {
                const snapshot = await getDocs(q);
                let productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log('Fetched products:', productsData);

                // Search functionality
                if (searchQuery) {
                    console.log('Applying search term:', searchQuery);
                    productsData = productsData.filter(product =>
                        product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }

                // Pagination
                const startIdx = (page - 1) * limit;
                const paginatedProducts = productsData.slice(startIdx, startIdx + limit);

                setProducts(paginatedProducts);
                console.log('Paginated products:', paginatedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProductsFromFirebase();
    }, [searchQuery, category, sortOption, page]);

    return (
        <div>
            <ProductGrid products={products} />
            <Pagination page={page} setPage={setPage} />
        </div>
    );
}
