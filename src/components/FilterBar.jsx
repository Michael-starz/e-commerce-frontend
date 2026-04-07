import { Search } from 'lucide-react';

// ShoppingCart, Heart, Star 

// Filter Component
const FilterBar = ({ setSearchTerm, setCategory }) => {
    const categories = ["All", "Electronics", "Fashion", "Home & Living"];
    
    return (
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-blue-600 transition-colors"
              onClick={() => setCategory(category === "All" ? "" : category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
  };

export default FilterBar;