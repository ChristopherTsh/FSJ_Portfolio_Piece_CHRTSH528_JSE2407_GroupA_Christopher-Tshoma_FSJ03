'use client'; // Enable client-side rendering
//App/componets/SortOptions.js
export default function SortOptions({ sortOption, setSortOption }) {
  return (
    <select
      onChange={(e) => setSortOption(e.target.value)}
      value={sortOption}
      className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out shadow-sm hover:bg-blue-50"
    >
      <option value="">Sort By</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  );
}
