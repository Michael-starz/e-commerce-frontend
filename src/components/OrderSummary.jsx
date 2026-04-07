import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ context
import { toast } from "react-toastify";

const OrderSummary = () => {
  const {
    subtotal,
    discount,
    tax,
    shipping,
    total,
    voucher,
    applyVoucher,
  } = useCart();

  const [voucherInput, setVoucherInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // 🆕 Human-readable shipping labels
  const shippingLabels = {
    free_shipping: "Free Shipping",
    standard_shipping: "Standard Shipping",
    two_days_shipping: "Two-Day Shipping",
    one_day_shipping: "One-Day Shipping",
  };

  // 🆕 Try to infer the label by shipping cost (works if mapped properly)
  const getShippingLabel = () => {
    const costToLabel = {
      0: "Free Shipping",
      10: "Standard Shipping",
      20: "Two-Day Shipping",
      30: "One-Day Shipping",
    };
    return costToLabel[shipping] || "Custom Shipping";
  };

  const handleApplyVoucher = () => {
    applyVoucher(voucherInput);
    if (voucherInput.trim().toUpperCase() === "EASTER") {
      toast.success("🎉 Voucher applied: 5% discount");
    } else {
      toast.error("❌ Invalid voucher code");
    }
  };

  return (
    <div className="card text-light border-0 bg-dark">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="card-title mb-0">Summary</h3>
          <Link to="/cart" className="btn btn-link text-light p-0">
            Edit cart
          </Link>
        </div>

        {/* Payment method dropdown */}
        <select
          className="form-select bg-transparent text-light border-0 mb-3"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="cod">Cash on Delivery</option>
          <option value="card">Card</option>
          <option value="paypal">Paypal</option>
        </select>

        {/* Summary Details */}
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Items subtotal:</span>
            <span className="fw-semibold text-light">${subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Discount:</span>
            <span className="text-danger">-${discount.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Tax:</span>
            <span className="fw-semibold text-light">${tax.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">
              Shipping ({getShippingLabel()}):
            </span>
            <span className="fw-semibold text-light">${shipping.toFixed(2)}</span>
          </div>
        </div>

        {/* Voucher Input */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Voucher"
            value={voucherInput}
            onChange={(e) => setVoucherInput(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary text-primary px-4"
            onClick={handleApplyVoucher}
          >
            Apply
          </button>
        </div>

        {/* Total */}
        <div className="d-flex justify-content-between border-top border-bottom border-secondary py-3 mb-4">
          <h4 className="mb-0">Total:</h4>
          <h4 className="mb-0">${total.toFixed(2)}</h4>
        </div>

        {/* Checkout button */}
        <Link to="/checkout" state={{ total, voucher, paymentMethod }}>
          <button className="btn btn-primary w-100">
            Proceed to checkout
            <i className="fas fa-chevron-right ms-1 small"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;




// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext"; // ✅ Pull everything from global context
// import { toast } from "react-toastify";

// const OrderSummary = () => {
//   const {
//     cart,
//     subtotal,
//     discount,
//     tax,
//     shipping,
//     total,
//     voucher,
//     applyVoucher, // ✅ NEW: Global voucher handler
//   } = useCart();

//   const [voucherInput, setVoucherInput] = useState(""); // 🔄 Replaces local voucher

//   const handleApplyVoucher = () => {
//     applyVoucher(voucherInput);
//     if (voucherInput.trim().toUpperCase() === "EASTER") {
//       toast.success("🎉 Voucher applied: 5% discount");
//     } else {
//       toast.error("❌ Invalid voucher code");
//     }
//   };

//   const [paymentMethod, setPaymentMethod] = useState("cod");

//   return (
//     <div className="card text-light border-0 bg-dark">
//       <div className="card-body">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h3 className="card-title mb-0">Summary</h3>
//           <Link to="/cart" className="btn btn-link text-light p-0">
//             Edit cart
//           </Link>
//         </div>

//         {/* Payment method dropdown */}
//         <select
//           className="form-select bg-transparent text-light border-0 mb-3"
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//         >
//           <option value="cod">Cash on Delivery</option>
//           <option value="card">Card</option>
//           <option value="paypal">Paypal</option>
//         </select>

//         {/* Summary Details */}
//         <div className="mb-3">
//           <div className="d-flex justify-content-between mb-2">
//             <span className="text-secondary">Items subtotal:</span>
//             <span className="fw-semibold text-light">${subtotal.toFixed(2)}</span>
//           </div>
//           <div className="d-flex justify-content-between mb-2">
//             <span className="text-secondary">Discount:</span>
//             <span className="text-danger">-${discount.toFixed(2)}</span>
//           </div>
//           <div className="d-flex justify-content-between mb-2">
//             <span className="text-secondary">Tax:</span>
//             <span className="fw-semibold text-light">${tax.toFixed(2)}</span>
//           </div>
//           <div className="d-flex justify-content-between mb-2">
//             <span className="text-secondary">Shipping Cost:</span>
//             <span className="fw-semibold text-light">${shipping.toFixed(2)}</span>
//           </div>
//         </div>

//         {/* Voucher Input */}
//         <div className="input-group mb-3">
//           <input
//             type="text"
//             className="form-control bg-dark text-light border-secondary"
//             placeholder="Voucher"
//             value={voucherInput} // 🔄 Controlled input
//             onChange={(e) => setVoucherInput(e.target.value)}
//           />
//           <button
//             className="btn btn-outline-secondary text-primary px-4"
//             onClick={handleApplyVoucher}
//           >
//             Apply
//           </button>
//         </div>

//         {/* Total */}
//         <div className="d-flex justify-content-between border-top border-bottom border-secondary py-3 mb-4">
//           <h4 className="mb-0">Total:</h4>
//           <h4 className="mb-0">${total.toFixed(2)}</h4>
//         </div>

//         {/* Checkout button, passing props */}
//         <Link to="/checkout" state={{ total, voucher, paymentMethod }}>
//           <button className="btn btn-primary w-100">
//             Proceed to checkout
//             <i className="fas fa-chevron-right ms-1 small"></i>
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;


