'use client'; // Enable client-side rendering
//App/components/ResetButton.js 
/**
 * ResetButton component that resets the filters and search query.
 * 
 * @param {Object} props - Component properties.
 * @param {function} props.resetFilters - Function to reset filters and search query.
 * @returns {JSX.Element} ResetButton component
 */
export default function ResetButton({ resetFilters }) {
  return (
    <button
      onClick={resetFilters}
      className="bg-red-500 text-white px-4 py-2 rounded-md mt-2
       transition duration-150 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Reset Filters
    </button>
  );
}
