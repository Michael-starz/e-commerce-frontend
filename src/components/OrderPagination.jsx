// components/OrderPagination.jsx
const OrderPagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="flex justify-center items-center mt-10 gap-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-40"
        >
          Previous
        </button>
  
        <span className="text-gray-300">
          Page <strong className="text-white">{currentPage}</strong> of {totalPages}
        </span>
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default OrderPagination;
  