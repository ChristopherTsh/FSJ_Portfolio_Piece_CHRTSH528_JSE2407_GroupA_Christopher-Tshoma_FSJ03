// app/components/CategoryFilter.js
import React from 'react';

export default function CategoryFilter({ selectedCategory, setSelectedCategory, categories = [] }) { // Default to an empty array
    return (
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
        >
            {categories.length > 0 ? ( // Check if categories have been fetched
                categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                ))
            ) : (
                <option value="">Loading categories...</option> // Fallback option
            )}
        </select>
    );
}
