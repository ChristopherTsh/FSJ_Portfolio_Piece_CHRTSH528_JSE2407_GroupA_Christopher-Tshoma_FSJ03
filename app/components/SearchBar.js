'use client'; // Enable client-side rendering

/**
 * SearchBar component that allows users to search for products.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.searchQuery - The current search query string.
 * @param {function} props.setSearchQuery - Function to update the search query state.
 * @returns {JSX.Element} SearchBar component
 */
export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search products..."
      className="border border-gray-300 rounded-md p-2 w-full md:w-64 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out shadow-sm"
    />
  );
}
