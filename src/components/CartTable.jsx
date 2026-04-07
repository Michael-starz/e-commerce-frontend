import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"; // ✅ Only if not already imported

const CartTable = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (!cart.length) {
    return (
      <div className="text-center text-white py-20">
        <div className="text-5xl mb-4">
          <i className="fas fa-shopping-cart text-gray-600"></i>
        </div>
        <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
        <p className="text-gray-400 mb-6">
          Looks like you haven’t added anything yet.
        </p>

        {/* ✅ Continue Shopping Button */}
        <Link to="/products">
          <button className="btn btn-primary">
            <i className="fas fa-arrow-left me-2"></i>
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => {
    return sum + item.productId.price * item.quantity;
  }, 0);

  return (
    <table className="table bg-transparent border-secondary cart-table">
      <thead>
        <tr className="text-secondary">
          <th></th>
          <th style={{ minWidth: "250px" }}>PRODUCTS</th>
          <th style={{ width: "80px" }}>COLOR</th>
          <th style={{ width: "150px" }}>SIZE</th>
          <th style={{ width: "200px" }} className="text-end">
            PRICE
          </th>
          <th style={{ width: "200px" }} className="ps-5">
            QUANTITY
          </th>
          <th style={{ width: "150px" }} className="text-end">
            TOTAL
          </th>
          <th className="text-end"></th>
        </tr>
      </thead>
      <tbody className="text-secondary">
        {cart.map((item) => (
          <tr key={item._id}>
            <td className="align-middle">
              <a href="#" className="d-block border border-secondary rounded-1">
                <img
                  src={item.productId.image}
                  className="rounded-1"
                  alt={item.productId.name}
                  width="53"
                />
              </a>
            </td>
            <td className="align-middle">
              <a
                href="#"
                className="text-decoration-none fw-semibold fs-9 text-primary"
              >
                {item.productId.name}
              </a>
            </td>
            <td className="align-middle text-secondary fs-9">
              N/A {/* If color variants are added later */}
            </td>
            <td className="align-middle text-secondary fs-9">
              N/A {/* If size variants are added later */}
            </td>
            <td className="align-middle text-end fw-semibold text-secondary fs-9">
              ${item.productId.price.toFixed(2)}
            </td>
            <td className="align-middle ps-5">
              <div className="input-group input-group-sm">
                <button
                  className="btn btn-sm px-2 text-white"
                  type="button"
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control text-center border-0 bg-transparent text-secondary"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item._id, parseInt(e.target.value) || 1)
                  }
                />
                <button
                  className="btn btn-sm px-2 text-white"
                  type="button"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </td>
            <td className="align-middle text-end fw-bold text-light fs-9">
              ${(item.productId.price * item.quantity).toFixed(2)}
            </td>
            <td className="align-middle text-end">
              <button
                className="btn btn-sm text-secondary"
                onClick={() => removeFromCart(item._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="6" className="text-end fw-semibold text-light">
            Items subtotal:
          </td>
          <td className="text-end fw-bold text-light">
            ${subtotal.toFixed(2)}
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartTable;


