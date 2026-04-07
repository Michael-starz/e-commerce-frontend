import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="product-loading">Loading...</div>;
  if (error) return <div className="product-error">Error: {error}</div>;
  if (!product) return <div className="product-not-found">Product not found</div>;

  return (
    <div className="product-page-container">
      <div className="product-details-container">
        {/* Product Images Gallery */}
        <div className="product-images">
          <div className="thumbnail-container">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
          <div className="main-image-container">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="main-product-image"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fas fa-star ${i < product.rating ? 'filled' : ''}`}
              ></i>
            ))}
            <span className="review-count">({product.reviewCount} reviews)</span>
          </div>

          <div className="product-price">
            {product.discountPrice ? (
              <>
                <span className="current-price">${product.discountPrice.toFixed(2)}</span>
                <span className="original-price">${product.price.toFixed(2)}</span>
                <span className="discount-badge">
                  {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="current-price">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-specs">
            <h3>Specifications</h3>
            <ul>
              {product.specifications.map((spec, index) => (
                <li key={index}>
                  <strong>{spec.key}:</strong> {spec.value}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="buy-now-btn">Buy Now</button>
          </div>

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
        </div>
      </div>

      {/* Related Products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="related-products">
          <h2>You May Also Like</h2>
          <div className="related-products-grid">
            {product.relatedProducts.map((related) => (
              <ProductCard key={related._id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Product Card Component (Reusable)
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.images[0]} alt={product.name} />
        {product.discountPrice && (
          <span className="discount-badge">
            {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
          </span>
        )}
        <button className="quick-view-btn">Quick View</button>
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>
        <div className="product-card-rating">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`fas fa-star ${i < product.rating ? 'filled' : ''}`}
            ></i>
          ))}
        </div>
        <div className="product-card-price">
          {product.discountPrice ? (
            <>
              <span className="current-price">${product.discountPrice.toFixed(2)}</span>
              <span className="original-price">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="current-price">${product.price.toFixed(2)}</span>
          )}
        </div>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductPage;