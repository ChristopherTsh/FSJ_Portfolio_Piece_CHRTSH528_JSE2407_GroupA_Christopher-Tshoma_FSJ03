import React from 'react';

/**
 * Searchbar component allows users to input search queries to filter products.
 *
 * @param {Object} props - The component props
 * @param {string} props.searchQuery - The current search query value
 * @param {function} props.setSearchQuery - Function to update the search query state
 * @returns {JSX.Element} The Searchbar component
 */
export default function Searchbar({ searchQuery, setSearchQuery }) {
  /**
   * Handles the change event for the search input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input element
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log('Search term:', e.target.value);
  };

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search products..."
      className="border border-gray-300 rounded-md p-2 w-full md:w-64 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out shadow-sm"
    />
  );
}
