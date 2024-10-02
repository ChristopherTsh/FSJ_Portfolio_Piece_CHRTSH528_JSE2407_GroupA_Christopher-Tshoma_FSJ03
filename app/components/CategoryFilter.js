'use client'; // Enable client-side rendering

import { useEffect, useState } from "react";

/**
 * CategoryFilter component allows users to filter products by category.
 *
 * @param {Object} props - The component props
 * @param {Array} props.categories - The list of categories to display
 * @param {string} props.selectedCategory - The currently selected category
 * @param {Function} props.setSelectedCategory - Function to update the selected category
 * @returns {JSX.Element} The CategoryFilter component
 */
export default function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://next-ecommerce-api.vercel.app/categories');
      const data = await response.json();
      setCategories(data);
      console.log("Categories fetched:", data);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  return (
    <select
      onChange={(e) => handleCategoryChange(e.target.value)}
      value={selectedCategory}
      className="border border-gray-300 rounded-md p-2 mt-2
       bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out shadow-sm hover:bg-blue-50"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
