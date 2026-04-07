import { Link } from "react-router-dom";

const MenuSection = () => {
    return (
      <div className="menu-section bg-dark py-2">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            {/* Categories on the left */}
            <ul className="navbar-nav d-flex flex-row align-items-center">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown">
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Electronics</a></li>
                  <li><a className="dropdown-item" href="#">Fashion</a></li>
                  <li><a className="dropdown-item" href="#">Home & Living</a></li>
                </ul>
              </li>
            </ul>
  
            {/* Desktop Links */}
            <ul className="navbar-nav d-none d-md-flex flex-row align-items-center gap-4">
              <li className="nav-item">
              <Link className="nav-link text-light" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/products" href="#">Shop Now</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">New Arrivals</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">Wishlist</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">Track Order</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">Shipping Info</a>
              </li>
            </ul>
  
            {/* Mobile Links */}
            <ul className="navbar-nav d-flex d-md-none flex-row align-items-center gap-3">
              <li className="nav-item">
              <Link className="nav-link text-light" to="/">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown">
                  More
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="nav-link text-light" to="/products" href="#">Shop Now</Link></li>
                  <li><a className="dropdown-item" href="#">New Arrivals</a></li>
                  <li><a className="dropdown-item" href="#">Wishlist</a></li>
                  <li><a className="dropdown-item" href="#">Track Order</a></li>
                  <li><a className="dropdown-item" href="#">Shipping Info</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default MenuSection;