// ✅ NEW: Import useCart
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const OrderSummaryCard = () => {
  // ✅ Use shared values from CartContext
  const { cart, subtotal, discount, tax, shipping, total, voucher } = useCart();

  console.log("Voucher:",voucher)
  console.log("Discount:", discount)
  return (
    <div className="card checkout-summary-card bg-dark">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="checkout-summary-heading">Summary</h3>
          <Link to={"/cart"} className="btn btn-link text-decoration-none pe-0" type="button">
            Edit cart
          </Link>
        </div>

        <div className="checkout-summary-border">
          <div className="ms-n2">
            {cart.map(item => (
              <div key={item._id} className="row align-items-center checkout-cart-item g-3">
                <div className="col-8 col-md-7 col-lg-8">
                  <div className="d-flex align-items-center">
                    <img className="checkout-item-image" src={item.productId?.image} alt={item.productId?.name} />
                    <h6 className="checkout-item-title">{item.productId?.name}</h6>
                  </div>
                </div>
                <div className="col-2 col-md-3 col-lg-2">
                  <h6 className="checkout-item-quantity">x{item.quantity}</h6>
                </div>
                <div className="col-2 ps-0">
                  <h5 className="checkout-item-price">${item.productId?.price.toFixed(2)}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Replace hardcoded with context values */}
        <div>
          <div className="checkout-summary-row">
            <h5 className="checkout-summary-label">Items subtotal:</h5>
            <h5 className="checkout-summary-value">${subtotal.toFixed(2)}</h5>
          </div>

          <div className="checkout-summary-row">
            <h5 className="checkout-summary-label">Discount:</h5>
            <h5 className="checkout-discount-value">-${discount.toFixed(2)} {voucher && `(Voucher: ${voucher})`}</h5>
          </div>

          <div className="checkout-summary-row">
            <h5 className="checkout-summary-label">Tax:</h5>
            <h5 className="checkout-summary-value">${tax.toFixed(2)}</h5>
          </div>

          <div className="checkout-summary-row">
            <h5 className="checkout-summary-label">Subtotal</h5>
            <h5 className="checkout-summary-value">${(subtotal - discount).toFixed(2)}</h5>
          </div>

          <div className="checkout-summary-row">
            <h5 className="checkout-summary-label">Shipping Cost</h5>
            <h5 className="checkout-summary-value">${shipping.toFixed(2)}</h5>
          </div>
        </div>

        <div className="checkout-total-row">
          <h4 className="checkout-total-label">Total :</h4>
          <h4 className="checkout-total-value">${total.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
