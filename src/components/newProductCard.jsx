import { ShoppingCart, Heart, Star } from "lucide-react"
import { useCart } from "../context/CartContext";

// Product Card Component
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
    return (
      <div className="card rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
          <button className="absolute top-2 right-2 p-2 rounded-full bg-gray-900 bg-opacity-50 hover:bg-opacity-70">
            <Heart className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-blue-400">{product.category}</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-300 ml-1">{product.rating}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2 truncate">{product.name}</h3>
          <p className="text-sm text-gray-400 mb-2 truncate">{product.description}</p> {/* ✅ NEW LINE */}
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-white">${product.price}</span>
            <button className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors" onClick={() => addToCart(product)}>
              <ShoppingCart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default ProductCard;