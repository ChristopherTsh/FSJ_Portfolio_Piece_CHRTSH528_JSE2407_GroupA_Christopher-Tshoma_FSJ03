import React from 'react';

export default function CategoryFilter({ selectedCategory, setSelectedCategory, categories }) {
    return (
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
        >
            {categories.map((category, index) => (
                <option key={index} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
            ))}
        </select>
    );
}
