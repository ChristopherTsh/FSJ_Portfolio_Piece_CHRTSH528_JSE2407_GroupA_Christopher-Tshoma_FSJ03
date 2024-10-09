// app/components/CategoryFilter.js

import React from 'react';

export default function CategoryFilter({ selectedCategory, setSelectedCategory, categories = [] }) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="border border-gray-300 rounded-md p-2 w-full md:w-64 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out shadow-sm"
    >
      {categories.map((category, index) => {
        // Ensure the category is a string before using charAt and slice
        if (typeof category === 'string') {
          return (
            <option key={index} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          );
        } else {
          // Fallback option if category is not a string
          return (
            <option key={index} value="">
              Invalid category
            </option>
          );
        }
      })}
    </select>
  );
}
