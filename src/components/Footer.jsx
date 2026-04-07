import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>About Us</h5>
            <p className="text-muted">Your one-stop shop for all things trendy and essential. We bring quality products right to your doorstep.</p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled quick-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Customer Service</h5>
            <ul className="list-unstyled quick-links">
              <li><Link to="/shipping">Shipping Policy</Link></li>
              <li><Link to="/returns">Returns & Exchanges</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Payment Methods</h5>
            <ul className="list-unstyled quick-links">
              <li><Link to="/payment/cod">Cash on Delivery</Link></li>
              <li><Link to="/payment/online">Online Payment</Link></li>
              <li><Link to="/payment/paypal">PayPal</Link></li>
              <li><Link to="/payment/installment">Installment</Link></li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col-md-10 text-center text-md-start">
            <p className="mb-0">&copy; 2025 ShopMart. All rights reserved.</p>
          </div>
          <div className="col-md-2 text-center text-md-end">
            <div className="d-flex gap-3 mb-0">
              <a href="#" className="text-light"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-light"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-light"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-light"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;