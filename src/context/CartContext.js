// src/context/CartContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cart, setCart] = useState([]);
  const [voucher, setVoucher] = useState(() => localStorage.getItem("voucher") || "");
  const [discount, setDiscount] = useState(() => parseFloat(localStorage.getItem("discount")) || 0);
  const [shippingFee, setShippingFee] = useState(30); // 🆕 Default to one_day_shipping

  const clearCart = () => {
    setCart([]);
  };

  const resetVoucher = () => {
    setVoucher("");
    setDiscount(0);
    localStorage.removeItem("voucher");
    localStorage.removeItem("discount");
  };

  const setShippingFromSelection = (method) => { // 🆕 Map shipping method to actual fee
    const rates = {
      free_shipping: 0,
      standard_shipping: 10,
      two_days_shipping: 20,
      one_day_shipping: 30,
    };
    const fee = rates[method] ?? 10; // fallback to standard
    setShippingFee(fee);
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.userId || !token) return;

      try {
        const res = await axios.get(`/cart/${user.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCart(res.data);
      } catch (err) {
        console.error("Error fetching cart", err);
      }
    };

    fetchCart();
  }, [user?.userId, token]);

  const addToCart = async (product, quantity = 1) => {
    if (!user || !token) {
      toast.error("You must be logged in to add items to your cart.");
      return;
    }
    try {
      await axios.post(
        "/cart/add",
        { userId: user.userId, productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedCart = await axios.get(`/cart/${user.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(updatedCart.data);
      toast.success("Item added to cart!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding to cart");
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (!user || !token) {
      toast.error("Please login to remove items from your cart.");
      return;
    }
    try {
      await axios.delete(`/cart/remove/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart((prev) => prev.filter((item) => item._id !== cartItemId));
      toast.success("Item removed");
    } catch (err) {
      toast.error("Error removing item");
    }
  };

  const subtotal = cart.reduce((sum, item) => {
    const price = item.productId?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const tax = 0.07 * subtotal;
  const shipping = shippingFee; // 🆕 Use mapped value instead of fixed 3%
  const total = subtotal - discount + tax + shipping;

  const applyVoucher = (code) => {
    if (code.trim().toUpperCase() === "EASTER") {
      const appliedDiscount = subtotal * 0.05;
      setVoucher(code.toUpperCase());
      setDiscount(appliedDiscount);
      localStorage.setItem("voucher", "EASTER");
      localStorage.setItem("discount", appliedDiscount);
    } else {
      setVoucher("");
      setDiscount(0);
      localStorage.removeItem("voucher");
      localStorage.removeItem("discount");
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (!user || !token) {
      toast.error("Please login to modify your cart.");
      return;
    }
    if (newQuantity < 1) return;

    try {
      await axios.put(
        `/cart/update/${cartItemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart((prev) =>
        prev.map((item) =>
          item._id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      toast.error("Error updating quantity");
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (voucher === "EASTER") {
      const updatedDiscount = subtotal * 0.05;
      setDiscount(updatedDiscount);
      localStorage.setItem("discount", updatedDiscount);
    }
  }, [subtotal, voucher]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        discount,
        tax,
        shipping,
        total,
        voucher,
        resetVoucher,
        applyVoucher,
        setVoucher,
        addToCart,
        setCart,
        clearCart,
        removeFromCart,
        updateQuantity,
        setShippingFromSelection, // 🆕 Expose setter to update dynamically
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

