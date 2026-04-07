const ProductCard = ({ product }) => {
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <i
            key={i}
            className={`${i <= product.rating ? 'fas' : 'far'} fa-star text-warning`}
          ></i>
        );
      }
      return stars;
    };
  
    return (
      <div className="position-relative text-decoration-none product-item h-100">
        <div className="d-flex flex-column justify-content-between h-100">
          <div>
            <div className="border border-1 border-secondary border-translucent rounded-3 position-relative mb-3">
              <button
                className="btn btn-wish position-absolute top-0 end-0 m-2 z-2 bg-transparent border-secondary"
                data-bs-toggle="tooltip" data-bs-placement="top" title="Add to wishlist"
              >
                <i className="far fa-heart text-secondary"></i>
              </button>
              <img className="img-fluid rounded-3" src={product.image} alt={product.name} />
            </div>
  
            <a className="stretched-link text-decoration-none" href="#">
              <h6 className="mb-2 lh-sm line-clamp-3 product-name text-white">{product.name}</h6>
            </a>
  
            <p className="fs-9">
              {renderStars()}
              <span className="text-secondary fw-semibold ms-1">({product.reviews} people rated)</span>
            </p>
          </div>
  
          <div>
            {product.isLimitedOffer && (
              <p className="fs-9 text-primary fw-bold mb-2">Limited time offer</p>
            )}
            {product.originalPrice && (
              <div className="d-flex align-items-center mb-1">
                <p className="me-2 text-danger text-decoration-line-through mb-0">${product.originalPrice.toFixed(2)}</p>
                <h3 className="text-white mb-0">${product.currentPrice.toFixed(2)}</h3>
              </div>
            )}
            {!product.originalPrice && (
              <h3 className="text-white mb-0">${product.currentPrice.toFixed(2)}</h3>
            )}
            {product.dealText && (
              <p className="text-tertiary mouse-desc">{product.dealText}</p>
            )}
            {product.colors && (
              <p className="text-body-primary fw-semibold fs-9 lh-1 mb-0">{product.colors}</p>
            )}
            {product.status && (
              <p className="text-body-primary text-danger fw-semibold fs-9 lh-1 mb-0">{product.status}</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductCard;