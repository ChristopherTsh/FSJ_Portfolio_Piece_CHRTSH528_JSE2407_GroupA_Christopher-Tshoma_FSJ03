'use client'; // Enable client-side rendering

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firestore instance

/**
 * CategoryFilter component allows users to filter products by category.
 *
 * @param {Object} props - The component props
 * @param {string} props.selectedCategory - The currently selected category
 * @param {Function} props.setSelectedCategory - Function to update the selected category
 * @returns {JSX.Element} The CategoryFilter component
 */
export default function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesData = querySnapshot.docs.map((doc) => doc.data());
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <select
      onChange={(e) => setSelectedCategory(e.target.value)}
      value={selectedCategory}
      className="border border-gray-300 rounded-md p-2 mt-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out shadow-sm hover:bg-blue-50"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
