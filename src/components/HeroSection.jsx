import { Link } from "react-router-dom";
import ProductPage from "./ProductPage";

const HeroSection = () => {
    const carouselItems = [
      {
        id: 1,
        title: "Summer Collection 2025",
        description: "Discover the latest trends and amazing deals",
        buttonText: "Shop Now",
        image: "/images/pexels-rann-vijay-677553-7742583.jpg"
      },
      {
        id: 2,
        title: "New Arrivals",
        description: "Check out our latest fashion collections",
        buttonText: "View Collection",
        image: "/images/pexels-orlovamaria-4940756.jpg"
      },
      {
        id: 3,
        title: "Special Offers",
        description: "Up to 50% off on selected items",
        buttonText: "Shop Deals",
        image: "/images/pexels-quirva-14541063.jpg"
      }
    ];
  
    return (
      <section className="hero-section">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {carouselItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
  
          <div className="carousel-inner">
            {carouselItems.map((item, index) => (
              <div key={item.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <div
                  className="carousel-background"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image})`
                  }}
                >
                  <div className="container d-flex align-items-center h-100">
                    <div className="carousel-content text-center w-100">
                      <h1 className="display-4 mb-4">{item.title}</h1>
                      <p className="lead mb-4">{item.description}</p>
                      <Link to='/products' className="btn btn-primary btn-lg">{item.buttonText} </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    );
  };
  
  export default HeroSection;