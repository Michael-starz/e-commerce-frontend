import { useState } from 'react';
import '../../styles/ProductPage.css';

const ProductImages = ({ images, name }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="product-images">
      <div className="thumbnail-container">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${name} thumbnail ${index + 1}`}
            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
            onClick={() => setSelectedImage(index)}
          />
        ))}
      </div>
      <div className="main-image-container">
        <img
          src={images[selectedImage]}
          alt={name}
          className="main-product-image"
        />
      </div>
    </div>
  );
};

export default ProductImages;