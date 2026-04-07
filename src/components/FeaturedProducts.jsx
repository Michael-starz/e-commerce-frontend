import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "PlayStation 5 DualSense Wireless Controller",
      image: "/images/ps5-wireless-controller.jpg",
      rating: 5,
      reviews: 44,
      originalPrice: 89.00,
      currentPrice: 46.99,
      dealText: "Deal ends in 5 days!",
      isLimitedOffer: true,
      colors: null,
      status: null
    },
    {
      id: 2,
      name: "Airpods Pro 2",
      image: "/images/airpods-black.jpg",
      rating: 5,
      reviews: 67,
      originalPrice: 249.00,
      currentPrice: 129.99,
      dealText: null,
      isLimitedOffer: true,
      colors: "2 colors",
      status: null
    },
    {
      id: 3,
      name: "Apple Magic Mouse (Wireless, Rechargable) - Mate Black",
      image: "/images/magic-mouse2.jpg",
      rating: 1,
      reviews: 4,
      originalPrice: null,
      currentPrice: 72.99,
      dealText: "Charger not included",
      isLimitedOffer: false,
      colors: "3 colors",
      status: null
    },
    {
      id: 4,
      name: "Coffee Maker",
      image: "/images/coffee-machine-dark-background_1198042-33742-2.jpg",
      rating: 3,
      reviews: 28,
      originalPrice: 60.00,
      currentPrice: 54.99,
      dealText: null,
      isLimitedOffer: true,
      colors: null,
      status: "Sold Out"
    }
  ];

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row g-4">
          {products.map(product => (
            <div key={product.id} className="col-md-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;