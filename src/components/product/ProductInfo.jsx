import RatingStars from '../ui/RatingStars';
import '../../styles/ProductPage.css';

const ProductInfo = ({ name, rating, reviewCount, price, discountPrice }) => {
  return (
    <div className="product-info">
      <h1 className="product-title">{name}</h1>
      <RatingStars rating={rating} reviewCount={reviewCount} />
      <div className="product-price">
        {discountPrice ? (
          <>
            <span className="current-price">${discountPrice.toFixed(2)}</span>
            <span className="original-price">${price.toFixed(2)}</span>
            <span className="discount-badge">
              {Math.round((1 - discountPrice / price) * 100)}% OFF
            </span>
          </>
        ) : (
          <span className="current-price">${price.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;