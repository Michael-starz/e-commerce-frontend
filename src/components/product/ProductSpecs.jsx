import '../../styles/product/ProductSpecs.css';

const ProductSpecs = ({ specifications }) => {
  return (
    <div className="product-specs">
      <h3>Specifications</h3>
      <ul>
        {specifications.map((spec, index) => (
          <li key={index} style={{ '--index': index }}>
            <strong>{spec.key}:</strong> {spec.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSpecs;