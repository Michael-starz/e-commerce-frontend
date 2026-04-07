// import { useState } from 'react';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from '../api/axiosInstance';

// import ShippingSection from './ShippingSection';
// import BillingSection from './BillingSection';
// import DeliverySection from './DeliverySection';
// import PaymentSection from './PaymentSection';

// const CheckoutForm = () => {
//   const [sameAsShipping, setSameAsShipping] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const [selectedShipping, setSelectedShipping] = useState("one_day_shipping"); // ✅ SELECTED SHIPPING

//   const { user, token } = useAuth();
//   const { total, clearCart, resetVoucher, voucher } = useCart();

//   // ✅ Shipping price mapping
//   const shippingPrices = {
//     free_shipping: 0,
//     standard_shipping: 10,
//     two_days_shipping: 20,
//     one_day_shipping: 30,
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user?.userId || !token) {
//       toast.error("You must be logged in to place an order");
//       return;
//     }

//     const shippingCost = shippingPrices[selectedShipping] ?? 0; // ✅ fallback to 0

//     setLoading(true);
//     try {
//       // ✅ 1. Place order with both deliveryMethod & shippingCost
//       await axios.post(
//         '/orders/add',
//         {
//           userId: user.userId,
//           voucher,
//           deliveryMethod: selectedShipping,
//           shippingCost,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // ✅ 2. Clear cart from DB
//       await axios.delete(`/cart/clear/${user.userId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       // ✅ 3. Clear local cart + discount
//       clearCart();
//       resetVoucher();

//       // ✅ 4. Navigate to orders
//       toast.success('Order placed successfully!');
//       navigate('/orders');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Error placing order');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <ShippingSection />
//       <hr className="checkout-hr" />

//       <BillingSection
//         sameAsShipping={sameAsShipping}
//         setSameAsShipping={setSameAsShipping}
//       />
//       <hr className="checkout-hr" />

//       {/* ✅ Pass selected shipping state */}
//       <DeliverySection
//         selectedShipping={selectedShipping}
//         setSelectedShipping={setSelectedShipping}
//       />
//       <hr className="checkout-hr" />

//       <PaymentSection />

//       <div className="row g-2 mb-5">
//         <div className="col-md-8 col-lg-9 d-grid">
//           <button className="btn btn-primary" type="submit" disabled={loading}>
//             {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
//           </button>
//         </div>
//         <div className="col-md-4 col-lg-3 d-grid">
//           <button
//             className="btn btn-secondary"
//             type="button"
//             onClick={() => toast.info('Save Order clicked')}
//           >
//             Save Order and Exit
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default CheckoutForm;

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../api/axiosInstance";

import ShippingSection from "./ShippingSection";
import BillingSection from "./BillingSection";
import DeliverySection from "./DeliverySection";
import PaymentSection from "./PaymentSection";

const CheckoutForm = () => {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState("free_shipping");

  const navigate = useNavigate();
  const { user, token } = useAuth();
  const {
    cart,
    total,
    clearCart,
    resetVoucher,
    voucher,
    setShippingFromSelection, // 🆕 Bring this in from context
  } = useCart();

  // 🆕 Update shipping fee when selection changes
  useEffect(() => {
    setShippingFromSelection(selectedShipping);
  }, [selectedShipping, setShippingFromSelection]);

  const shippingPrices = {
    free_shipping: 0,
    standard_shipping: 10,
    two_days_shipping: 20,
    one_day_shipping: 30,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.userId || !token) {
      toast.error("You must be logged in to place an order");
      return;
    }

    const shippingCost = shippingPrices[selectedShipping] ?? 0;

    setLoading(true);

    // ✅ Frontend check for inStock before placing order
    for (const item of cart) {
      const available = item.productId?.inStock || 0;
      if (item.quantity > available) {
        toast.error(
          `❌ Sorry, ${item.productId.name} is out of stock. Only ${available} available.`
        );
        setLoading(false);
        return; // 🛑 Stop order submission
      }
    }

    try {
      await axios.post(
        "/orders/add",
        {
          userId: user.userId,
          VoucherCode: voucher,
          deliveryMethod: selectedShipping,
          shipping: shippingCost,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await axios.delete(`/cart/clear/${user.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      clearCart();
      resetVoucher();

      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ShippingSection />
      <hr className="checkout-hr" />

      <BillingSection
        sameAsShipping={sameAsShipping}
        setSameAsShipping={setSameAsShipping}
      />
      <hr className="checkout-hr" />

      <DeliverySection
        selectedShipping={selectedShipping}
        setSelectedShipping={setSelectedShipping}
      />
      <hr className="checkout-hr" />

      <PaymentSection />

      <div className="row g-2 mb-5">
        <div className="col-md-8 col-lg-9 d-grid">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
          </button>
        </div>
        <div className="col-md-4 col-lg-3 d-grid">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => toast.info("Save Order for later")}
          >
            Save Order and Exit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
