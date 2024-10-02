'use client'; // Enable client-side rendering

/**
 * SortOptions component that allows users to sort products by price.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.sortOption - The current sort option selected.
 * @param {function} props.setSortOption - Function to update the sort option state.
 * @returns {JSX.Element} SortOptions component
 */
export default function SortOptions({ sortOption, setSortOption }) {
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <select
      onChange={handleSortChange}
      value={sortOption}
      className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out shadow-sm hover:bg-blue-50"
    >
      <option value="">Sort By</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  );
}
