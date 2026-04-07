import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify'; // ✅ NEW: Toast for logout
import { useCart } from "../context/CartContext";

const Navbar = ({ setShowForm }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { cartCount, resetVoucher, clearCart } = useCart();
  // const { clearCart } = useCart();
  // console.log(cartCount)

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    clearCart();
    resetVoucher();
    toast.success("You have successfully logged out 👋"); // ✅ NEW: Toast feedback
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center w-100">
            <Link className="navbar-brand d-flex align-items-center text-white" to="/">
              ShopMart
            </Link>

            <form className="d-none d-lg-block col-lg-6">
              <input className="form-control rounded-5" type="search" placeholder="Search products..." aria-label="Search" />
            </form>

            <div className="d-flex align-items-center gap-3">
              {!isAuthenticated ? (
                <button onClick={() => setShowForm?.(true)} className="btn btn-link text-decoration-none user-link">
                  <i className="fas fa-user"></i> Login
                </button>
              ) : (
                <div className="dropdown text-end">
                  <button className="d-block text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center bg-dark text-white"
                      style={{ width: '32px', height: '32px', fontSize: '14px' }}
                    >
                      {getInitials(user.name)}
                    </div>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end text-small">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/orders">My Orders</Link></li> {/* ✅ NEW: Order history route */}
                    <li><Link className="dropdown-item" to="#">Settings</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}

              <Link to="/cart" className="btn btn-link text-decoration-none position-relative">
                <i className="fas fa-shopping-cart"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
                </span>
              </Link>
            </div>
          </div>

          <form className="d-block d-lg-none mt-2 w-100">
            <input className="form-control rounded-5" type="search" placeholder="Search products..." aria-label="Search" />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
