import '../../styles/product/ProductDescription.css';

const ProductDescription = ({ description }) => {
  return (
    <div className="product-description">
      <h3>Description</h3>
      <p>{description}</p>
    </div>
  );
};

export default ProductDescription;