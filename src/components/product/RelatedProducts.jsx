import ProductCard from './ProductCard';
import '../../styles/product/RelatedProducts.css';

const RelatedProducts = ({ products }) => {
  return (
    <div className="related-products">
      <h2>You May Also Like</h2>
      <div className="related-products-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;