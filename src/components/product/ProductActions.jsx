import QuantitySelector from '../ui/QuantitySelector';
import '../../styles/ProductPage.css';

const ProductActions = ({ quantity, setQuantity, stock }) => {
  return (
    <div className="product-actions">
      <QuantitySelector 
        quantity={quantity}
        setQuantity={setQuantity}
        maxQuantity={stock}
      />
      <button className="add-to-cart-btn">Add to Cart</button>
      <button className="buy-now-btn">Buy Now</button>
    </div>
  );
};

export default ProductActions;