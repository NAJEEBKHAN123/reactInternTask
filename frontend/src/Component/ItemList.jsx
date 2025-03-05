import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function ItemList({ items, fetchItemData }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isDeleting, setIsDeleting] = useState(null); // Track deleting state
  const [loading, setLoading] = useState(true); // Main loading state
  const itemsPerPage = 5;
  const pageRangeDisplayed = 5;

  // Add initial loading effect
  useEffect(() => {
    if (items.length > 0) {
      setLoading(false);
    }
  }, [items]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory ? item.category === filterCategory : true)
  );

  const startIndex = currentPage * itemsPerPage;
  const selectedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const deleteItem = async (id) => {
    try {
      setIsDeleting(id); // Set deleting state for specific item

      await axios.delete(`http://localhost:3000/api/items/${id}`, {
        headers: {'Content-Type' : 'application/json'}
      })
      alert("Item Deleted Successfully 🚀");
      await fetchItemData();
    } catch (error) {
      console.error("Error deleting item:", error);
    } 
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold ">Items List</h2>

      {/* Search and Filter Section */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 rounded-md px-4 py-2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0); 
          }}
        />
        <select
          className="border border-gray-300 rounded-md px-4 py-2"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {[...new Set(items.map((item) => item.category))].map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        // Spinner Loading
        <div className="flex justify-center items-center py-20">
          <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : selectedItems.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No items found!</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>

          <tbody>
            {selectedItems.map((item, index) => (
              <tr 
                key={index} 
                className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition duration-300"
              >
                <th className="border border-gray-300 text-start pl-4 py-2">
                  {index + 1 + startIndex}
                </th>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.category}</td>
                <td className="border border-gray-300 px-4 py-2">${item.price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => deleteItem(item._id)}
                    disabled={isDeleting === item._id}
                    className="text-white px-2 py-1 rounded-md bg-red-500 disabled:bg-red-300"
                  >
                    {isDeleting === item._id ? (
                      <span className="inline-flex items-center">
                        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Deleting...
                      </span>
                    ) : (
                      "✖️"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-center py-4">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredItems.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"flex gap-2"}
          pageClassName={"px-4 py-2 bg-blue-100 rounded-md cursor-pointer"}
          activeClassName={"bg-blue-500 text-white"}
          previousClassName={"px-4 py-2 bg-blue-300 rounded-md cursor-pointer"}
          nextClassName={"px-4 py-2 bg-blue-300 rounded-md cursor-pointer"}
          pageRangeDisplayed={pageRangeDisplayed}
        />
      </div>
    </div>
  );
}

export default ItemList;
