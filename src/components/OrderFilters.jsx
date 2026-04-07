// components/OrderFilters.jsx
const OrderFilters = ({ onFilterChange }) => {
    const statuses = ["All", "Pending", "Shipped", "Delivered", "Cancelled"];
  
    return (
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => onFilterChange(status)}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-blue-600 transition-colors"
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default OrderFilters;
  