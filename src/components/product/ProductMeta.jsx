import '../../styles/product/ProductMeta.css';

const ProductMeta = () => {
  return (
    <div className="product-meta">
      <div className="meta-item">
        <i className="fas fa-truck"></i>
        <span>Free shipping on orders over $50</span>
      </div>
      <div className="meta-item">
        <i className="fas fa-undo"></i>
        <span>30-day return policy</span>
      </div>
      <div className="meta-item">
        <i className="fas fa-shield-alt"></i>
        <span>2-year warranty</span>
      </div>
    </div>
  );
};

export default ProductMeta;